#include <Arduino.h>
#include <DataTransformation.h>
#include <SensorModule.h>
#include <Display.h>
#include <SensorSelection.h>
#include <MicroSDCardOperations.h>
#include <ProcessReadings.h>
#include <ArduinoJson.h>
#include <EventDrivenButtonPress.h>
#include <Preferences.h>
#include <Utils.h>
#include <driver/adc.h>
#include "esp_adc_cal.h"

/*Libraries included via project 'lib' folder:
 * GxEPD
 * esp32-micro-sdcard
 * DFRobot_PH
 */

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
  pinMode(DATA2, INPUT);
  pinMode(ANALOGUE, INPUT);

  // Settings to allow measurement of battery level using pin 14
  esp_adc_cal_characteristics_t adc_chars;
  esp_adc_cal_value_t val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_1, (adc_atten_t)ADC_ATTEN_DB_2_5, (adc_bits_width_t)ADC_WIDTH_BIT_12, 1100, &adc_chars);
  pinMode(14, OUTPUT);

  // Instance variables of custom classes that provide methods required to be called from main.cpp.
  SensorModule sensorModule;
  SensorSelection sensorSelection;
  MicroSDCardOperations microSDCardOperations;
  EventDrivenButtonPress eventDrivenButtonPress;
  ProcessReadings process;

  // Other variables
  String jsonString = "";    // used to store converted JSON object in.

  Serial.begin(9600);
  delay(500);

  // General initialisations
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
