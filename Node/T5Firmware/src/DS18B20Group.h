#pragma once
#include "SensorGroup.h"
#include <DallasTemperature.h>
#include "MicroSDCardOperations.h"

class DS18B20Group : public SensorGroup
{
    public:
        DallasTemperature dallas;
        void initialise();
        void getReadings();
        void calibrate();
};