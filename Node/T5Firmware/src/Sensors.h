#pragma once
#include <Arduino.h>
#include <ArduinoJson.h>
#include <SensorModule.h>
#include <Utils.h>
#include "definitions.h"
#include <cstdarg>
#include <Wire.h>
#include <OneWire.h>
#include <EEPROM.h>
#include <WiFiConnection.h>
#include <MicroSDCardOperations.h>
#include <SHTSensor.h>
#include "DFRobot_ESP_EC.h"
// #include <DallasTemperature.h>
#include "DS18B20Group.h"
#include "DFRobot_ESP_PH.h"

#include <GY30_BH1750.h>
#include <SHTC3.h>
#include <EC.h>
#include <PHGroup.h>

class Sensors
{
public:
    void readData();
    void calibrateEC();     // This is not the ideal place for this function, but EC sensors are defined individually. Calibration needs to be carried out as a group.
};