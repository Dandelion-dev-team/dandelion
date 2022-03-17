#pragma once
// #include <DataTransformation.h>
#include <Arduino.h>
#include <map>
// #include <Adafruit_TSL2591.h>
// #include <Adafruit_BME280.h>

class SensorModule
{
public:
    virtual void initialise();
    virtual float getReadings();
    float getReadings(int);
};