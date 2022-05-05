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
<<<<<<< Updated upstream
=======
#include <WiFi.h>
#include <SD.h>
#include "ESP-FTP-Server-Lib.h"
#include "FTPFilesystem.h"
#include <httpServer.h>
>>>>>>> Stashed changes

/*Libraries included via project 'lib' folder:
 * GxEPD
 * esp32-micro-sdcard
 * DFRobot_PH
 */

<<<<<<< Updated upstream
// Sleep variables
#define uS_TO_S_FACTOR 1000000          // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 15                // Time ESP32 will go to sleep (in seconds)

// Global object instatiation
Utils utils;                            // Allows access to utility methods
Preferences preferences;                // For accessing EEPROM
String ssid;                            // WiFi SSID - needs to be global to be stored in preferences
String pwd;                             // WiFi password - needs to be global to be stored in preferences
DynamicJsonDocument configDoc(256);     // JSON document which stores the configuration info as stored on the MicroSD card.
DataTransformation dataTransformation;
Display ui;
MicroSDCardOperations cardOperation;
WiFiConnection wiFiConnection;

// Other global variabls
uint8_t mode = SENSORMODE;
=======

// Global object instatiation
Utils utils;                              // Allows access to utility methods
Preferences preferences;                  // For accessing EEPROM
DynamicJsonDocument configDoc(256);       // JSON document which stores the configuration info as stored on the MicroSD card.
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

// Variable to store the HTTP request
String header;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  pinMode(DATA2, INPUT);
  pinMode(ANALOGUE, INPUT);
=======
  pinMode(ANALOGUE1, INPUT);
  pinMode(ANALOGUE2, INPUT);
  pinMode(ANALOGUE3, INPUT);

  // Ensure that the version number is stored
  utils.saveToPreferences("version", String(VERSION));

  // Try to set time from a server
  timeNow = wiFiConnection.getTime();

  SPISD.begin(SD_SCK, SD_MISO, SD_MOSI);
>>>>>>> Stashed changes

  // Settings to allow measurement of battery level using pin 14
  esp_adc_cal_characteristics_t adc_chars;
  esp_adc_cal_value_t val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_1, (adc_atten_t)ADC_ATTEN_DB_2_5, (adc_bits_width_t)ADC_WIDTH_BIT_12, 1100, &adc_chars);
  pinMode(14, OUTPUT);

  // Instance variables of custom classes that provide methods required to be called from main.cpp.
<<<<<<< Updated upstream
  SensorModule sensorModule;
  SensorSelection sensorSelection;
=======
  // SensorModule sensorModule;
  Sensors sensors;
>>>>>>> Stashed changes
  MicroSDCardOperations microSDCardOperations;
  EventDrivenButtonPress eventDrivenButtonPress;
  ProcessReadings process;

  // Other variables
  String jsonString = "";    // used to store converted JSON object in.

  Serial.begin(9600);
  delay(500);

  // General initialisations
<<<<<<< Updated upstream
  mode = utils.get_mode();                            // Determine the mode of operation based on the reason that the processor woke up
  eventDrivenButtonPress.initialise();                // sets the interrupt to the T5's Reset button.
  ui.setupDisplay();                                  // display home page showing Dandelion logo & wifi connection status, which is currently disconnected.
  configDoc = microSDCardOperations.getConfigData();  // read in configuration data stored in the config file on MicroSD card.

  Serial.print("Mode: ");
  Serial.println(mode);

  // commence the reading-taking process.
  // sensorSelection.setAndLevelSelection();

  // Collect sensor readings
  //     Top
  //        SET1
  //            I2C
  //            EC
  //        SET2
  //            Moisture
  //        SET3
  //            pH
  //     Middle
  //        SET1
  //            EC
  //        SET2
  //            Moisture
  //        SET3
  //            pH
  //     Bottom
  //        SET1
  //            EC
  //        SET2
  //            Moisture
  //        SET3
  //            pH
  //     All
  //        SET2
  //        Sub temp

  
  // ToDo: check that the size is adequate
  DynamicJsonDocument data(MAXMESSAGESIZE);
  data["message"] = (char *)"hello";

  data["timestamp"] = wiFiConnection.getTime();
  data["mac"] = WiFi.macAddress();
  data["battery"] = utils.get_battery_percent();
  

  serializeJson(data, jsonString); // convert from JSON to character array.

  process.sendToServer(jsonString);

  utils.debug("Going to sleep");
  ui.update_display();
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_deep_sleep_start();
}

void loop() {}
=======
  eventDrivenButtonPress.initialise();               // sets the interrupt to the T5's Reset button.
  ui.setupDisplay();                                 // display home page showing Dandelion logo & wifi connection status, which is currently disconnected.
  mode = utils.get_mode();                           // Determine the mode of operation based on the reason that the processor woke up
  configDoc = microSDCardOperations.getConfigData(); // read in configuration data stored in the config file on MicroSD card.

  if (buttonCount < 3) {

    // If the file dandelion.bin is present on the SD card, use it to upgrade the firmware, then reset
    cardOperation.updateFromSD();

    // Go into normal operations mode
    sensors.readData();

    data["timestamp"] = wiFiConnection.getTime();
    data["mac"] = WiFi.macAddress();
    data["battery"] = utils.get_battery_percent();

    serializeJson(data, jsonString); // convert from JSON to character array.

    process.sendToServer(jsonString);

    utils.debug("Going to sleep");
    ui.update_display();
    
    // Time to sleep is one hour minus the amount of time we have spent awake
    esp_sleep_enable_timer_wakeup((TIME_TO_SLEEP - millis()/1000) * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
  }
  else {
    // Go into AP mode

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
>>>>>>> Stashed changes
