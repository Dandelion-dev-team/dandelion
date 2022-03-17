#pragma once
#include <DataTransformation.h>
#include <Arduino.h>
#include <map>
#include <math.h>

class SensorModule
{
public:
    virtual void initialise(); //used by the sensor subclasses of this base class
    void initialiseSet1();
    void initialiseSet2();
    void initialiseSet3();

    virtual float getReadings();
    void getReadingsSet1();
    void getReadingsSet2();
    float getReadings(int);
};