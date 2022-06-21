#pragma once
#include <Arduino.h>
#include <DataTransformation.h>
#include <SensorModule.h>
#include <Display.h>
#include <Sensors.h>
#include <MicroSDCardOperations.h>
#include <ProcessReadings.h>
#include <ArduinoJson.h>
#include <EventDrivenButtonPress.h>
#include <Preferences.h>
#include <Utils.h>
#include <driver/adc.h>
#include "esp_adc_cal.h"
#include <WiFi.h>
#include <SD.h>
#include "ESP-FTP-Server-Lib.h"
#include "FTPFilesystem.h"
#include <httpServer.h>

/*Libraries included via project 'lib' folder:
 * GxEPD
 * esp32-micro-sdcard
 * DFRobot_PH
 */


// Global object instatiation
Utils utils;                              // Allows access to utility methods
Preferences preferences;                  // For accessing EEPROM
DynamicJsonDocument data(MAXMESSAGESIZE); // JSON document which holds the current set of readings
                                          // ToDo: check that the size is adequate
DataTransformation dataTransformation;
Display ui;
MicroSDCardOperations cardOperation;
WiFiConnection wiFiConnection;

// Preferences - must be global to work
String version; // Firmware version number
String npwd;    // Node password
String ssid;    // WiFi SSID
String pwd;     // WiFi password
int logseq;     // Sequential log entry number - the preferences value is the most recently used number


// Other global variables
uint8_t mode = SENSORMODE;
uint8_t buttonCount = 0;
String timeNow;
time_t now;
// float battery;
char messageBuffer[256];

// Variables to manage UI interactions
uint8_t selectedOption = 0;
uint8_t lastClickType = 0;
uint8_t menuAction = 999;

// Second SPI interface for SD card
SPIClass SPISD(HSPI);

// Set web server port number to 80
WiFiServer server(80);
HttpServer http;
FTPServer ftp;

void setup()
{
  pinMode(BUTTONPIN, INPUT_PULLDOWN);
  pinMode(SET_1, OUTPUT);
  pinMode(SET_2, OUTPUT);
  pinMode(SET_3, OUTPUT);
  pinMode(DATA1, INPUT);
  pinMode(ANALOGUE1, INPUT_PULLDOWN);   // Must be reset after every analogRead()
  pinMode(ANALOGUE2, INPUT_PULLDOWN);   // Actually, pin 34 has no internal pulldown but used here for consistency
  pinMode(ANALOGUE3, INPUT_PULLDOWN);

  // Set timezone
  setenv("TZ", "GMT0BST,M3.5.0/1,M10.5.0", 1);
  tzset();

  Serial.begin(9600);
  delay(500);

  // Instance variables of custom classes that provide methods that need to be called from main.cpp.
  Sensors sensors;
  EventDrivenButtonPress eventDrivenButtonPress;
  ProcessReadings process;

  // General initialisations
  // battery = utils.get_battery_percent(); // Causes spurious button presses
  // utils.reset_adc();  // Not needed if get_battery_percent is called
  eventDrivenButtonPress.initialise(); // sets the interrupt to the T5's Reset button.
  ui.setupDisplay(); // display home page showing Dandelion logo & wifi connection status, which is currently disconnected.

  // char buffer[20];
  // strcpy(buffer, "Voltage: ");
  // strcat(buffer, utils.to_string(battery));
  // ui.displayMessage(buffer);

  // Check button presses here. Wifi operations add spurious data
  if (buttonCount >= 6)
    mode = RESETMODE;
  else if (buttonCount >= 3)
    mode = CONFIGMODE;  

  SPISD.begin(SD_SCK, SD_MISO, SD_MOSI);
  delay(100);
  if (!SD.begin(SD_CS, SPISD))
  {
    ui.displayMessage("SD card error", true);
  }

  // Get the next log sequence value and store the new one
  logseq = utils.getFromPreferences("logseq", 0) + 1;
  utils.saveToPreferences("logseq", logseq);

  // Try to set time from a server
  wiFiConnection.connect();
  wiFiConnection.getTime();
  wiFiConnection.disconnect();

  // Report firmware version number
  cardOperation.log("Firmware version:", String(VERSION).c_str());

  // If the file dandelion.bin is present on the SD card, use it to upgrade the firmware, then reboot
  cardOperation.updateFromSD();

  // User prompt
  ui.menu(MAINMENU, 3, selectedOption);
  ui.clearScreen();

  switch (menuAction)
  {
    case READ_PH:
    {
      ui.clearScreen();

      PHGroup ph;
      utils.select(SET_3);
      ph.initialise();
      ui.proceed("Switch on pH sensors", "then press the button", 60);

      ph.calibrate();

      // ToDo: Reinstate later to adjust for temperature
      // DS18B20Group ds18b20;
      // utils.select(SET_2);
      // ui.clearMenu();
      // ds18b20.initialise();
      // ds18b20.getReadings();

      ui.displayMessage("Reading pH sensors...");
      ph.getReadings();
      ph.addReadingsToJSON();
      ui.proceed("Switch off pH sensors", "then press the button", 60);

      mode = SENSORMODE;
      break;
    }
    case CALIBRATE_TEMP:
    {
      DS18B20Group ds18b20;
      utils.select(SET_2);
      ui.clearScreen();

      // delay(2000);
      ds18b20.initialise();
      ds18b20.calibrate();
      break;
    }
    case CONFIG_MODE:
    {
      mode = CONFIGMODE;
      break;
    }
  }

  ui.clearScreen();
  
  if (mode == SENSORMODE)
  {
    cardOperation.log("Starting sensor readings");
    sensors.readData();

    cardOperation.log("Sending data to server");
    process.sendToServer();

    ui.displayMessage("");
    ui.update_display();
    ui.displayMessage("Sleeping", 2);
    cardOperation.log("Going to sleep");

    // TODO: add wake time to display

    // Time to sleep is TIME_TO_SLEEP minus the amount of time we have spent awake
    esp_sleep_enable_timer_wakeup((TIME_TO_SLEEP - millis() / 1000) * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
  }
  else {
    // Go into AP mode
    cardOperation.log("Start configuration");

    // Access point configuration
    const char *apSsid = "Dandelion";
    String apPassword;

    apPassword = utils.getFromPreferences("npwd");

    if (mode == RESETMODE or apPassword == "NOT SET")
    {
      // Reset default AP password
      apPassword = "123456789";
      utils.saveToPreferences("npwd", apPassword);
      cardOperation.log("AP password reset to default");
    }

    WiFi.mode(WIFI_AP);
    delay(250);
    WiFi.softAP(apSsid, apPassword.c_str());
    delay(250);
    IPAddress IP = WiFi.softAPIP();
    ui.displayMessage("Configuration mode");
    ui.displayMessage(IP.toString().c_str(), 2);

    server.begin();

    ftp.addUser(FTP_USER, FTP_PASSWORD);
    ftp.addFilesystem("SD", &SD);

    ftp.begin();
  }
}

void loop() {
  http.handle();
  ftp.handle();
}
