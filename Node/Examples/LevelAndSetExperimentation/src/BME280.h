#pragma once
#include "SensorModule.h"
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

class BME280 : public SensorModule
{
public:
    void initialise();
    float getReadings();
};