#pragma once
#include "SensorModule.h"
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2591.h>

class TSL2591 : public SensorModule
{
public:
    void initialise();
    float getReadings();
};