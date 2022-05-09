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


// Other global variables
uint8_t mode = SENSORMODE;
uint8_t buttonCount = 0;
String timeNow;

// Second SPI interface for SD card
SPIClass SPISD(HSPI);

// Set web server port number to 80
WiFiServer server(80);
HttpServer http;
FTPServer ftp;

void setup()
{
  pinMode(BUTTONPIN, INPUT_PULLDOWN);
  pinMode(TOP, OUTPUT);
  pinMode(MIDDLE, OUTPUT);
  pinMode(BOTTOM, OUTPUT);
  pinMode(SET_1, OUTPUT);
  pinMode(SET_2, OUTPUT);
  pinMode(SET_3, OUTPUT);
  pinMode(DATA1, INPUT);
  pinMode(ANALOGUE1, INPUT);
  pinMode(ANALOGUE2, INPUT);
  pinMode(ANALOGUE3, INPUT);

  Serial.begin(9600);
  delay(500);

  // Set ADC characteristics required to measure battery level on pin 14
  utils.debug("Setting ADC charactersitics");
  esp_adc_cal_characteristics_t adc_chars;
  esp_adc_cal_value_t val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_1,
                                                          (adc_atten_t)ADC_ATTEN_DB_2_5,
                                                          (adc_bits_width_t)ADC_WIDTH_BIT_12,
                                                          1100, &adc_chars);
  pinMode(14, OUTPUT);

  // Ensure that the version number is stored
  utils.saveToPreferences("version", String(VERSION));

  // Instance variables of custom classes that provide methods required to be called from main.cpp.
  Sensors sensors;
  MicroSDCardOperations microSDCardOperations;
  EventDrivenButtonPress eventDrivenButtonPress;
  ProcessReadings process;

  // General initialisations
  eventDrivenButtonPress.initialise(); // sets the interrupt to the T5's Reset button.
  ui.setupDisplay();                   // display home page showing Dandelion logo & wifi connection status, which is currently disconnected.
  mode = utils.get_mode();             // Determine the mode of operation based on the reason that the processor woke up

  SPISD.begin(SD_SCK, SD_MISO, SD_MOSI);
  if (!SD.begin(SD_CS, SPISD))
  {
    ui.displayMessage("SD card error", true);
  }

  if (buttonCount < 3)
  {

    // If the file dandelion.bin is present on the SD card, use it to upgrade the firmware, then reset
    cardOperation.updateFromSD();

    // Go into normal operations mode
    sensors.readData();

    process.sendToServer();

    utils.debug("Going to sleep");
    ui.update_display();

    // Time to sleep is one hour minus the amount of time we have spent awake
    esp_sleep_enable_timer_wakeup((TIME_TO_SLEEP - millis() / 1000) * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
  }
  else {
    // Go into AP mode

    // Try to set time from a server
    if (wiFiConnection.connectToWiFi())
    {
      WiFi.disconnect();
    }

    // Access point configuration
    const char *apSsid = "Dandelion";
    String apPassword;

    apPassword = utils.getFromPreferences("npwd");

    if (buttonCount >= 6 or apPassword == "NOT SET")
    {
    //   // Reset default AP password
      apPassword = "123456789";
      utils.saveToPreferences("npwd", apPassword);
    }

    WiFi.softAP(apSsid, apPassword.c_str());
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
