#pragma once
#include "SensorModule.h"

class GenericSensor : public SensorModule 
{
    public:
        uint8_t cubeLevel;
        void initialise();
        void getReadings();
};
