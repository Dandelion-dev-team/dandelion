#include <Arduino.h>
#include <SensorModule.h>
#include <Display.h>
#include <SensorSelection.h>
#include <MicroSDCardOperations.h>
#include <ArduinoJson.h>
#include <EventDrivenButtonPress.h>
/*Libraries included via project 'lib' folder:
* GxEPD
* esp32-micro-sdcard
* DFRobot_PH
*/

//Sleep variables
#define uS_TO_S_FACTOR 1000000 // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 15        // Time ESP32 will go to sleep (in seconds)

//Global JSON document which stores the configuration info as stored on the MicroSD card.
DynamicJsonDocument configDoc(256);

void setup() 
{
  //Instance variables of custom classes that provide methods required to be called from main.cpp.
  SensorModule sensorModule;
  SensorSelection sensorSelection;
  MicroSDCardOperations microSDCardOperations;
  EventDrivenButtonPress eventDrivenButtonPress;
  WiFiConnection wiFiConnection;
  Display display;

  Serial.begin(115200);
  delay(500);

  //sets the interrupt to the T5's Reset button.
  eventDrivenButtonPress.initialise();
  delay(500);

  //display home page showing Dandelion logo & wifi connection status, which is currently disconnected.
  display.setupDisplay();

  //read in configuration data stored in the config file on MicroSD card.
  configDoc = microSDCardOperations.getConfigData();

  //connect to wifi.
  wiFiConnection.connectToWiFi();

  //commence the reading-taking process.
  sensorSelection.setAndLevelSelection();

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_deep_sleep_start();
}

void loop()
{}

