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
#include <GY30_BH1750.h>
#include <SHTSensor.h>
#include "DFRobot_ESP_EC.h"
#include <DallasTemperature.h>
#include "DFRobot_ESP_PH.h"

// #include <BMP280.h>
#include <SHTC3.h>
#include <TDSMeter.h>
#include <Moisture.h>
#include <PHSensor.h>

class Sensors
{
public:
    void readData();
};