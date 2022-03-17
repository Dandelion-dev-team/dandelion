#include <Arduino.h>
#include <SensorModule.h>
#include <SensorSelection.h>
#include <DataTransformation.h>

#define millisecondsToSecondsFactor 1000000// sleep -- conversion factor for micro seconds to seconds
#define secondsToSleep  5 //sleep -- number of seconds to put T-Beam to sleep for

SensorModule sensorModule;
SensorSelection sensorSelection;

void setup()
{
    Serial.begin(115200);
    delay(500);
    // sensorModule.initialise(); - this doesn't work - we cant initialise sensors when there is no power going to them.
    delay(500);
    sensorSelection.setAndLevelSelection();
    esp_sleep_enable_timer_wakeup(secondsToSleep * millisecondsToSecondsFactor);
    esp_deep_sleep_start();
}

void loop()
{}