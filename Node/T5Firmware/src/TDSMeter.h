#pragma once
#include "SensorModule.h"

class TDSMeter : public SensorModule
{
public:
    void initialise();
    float getReadings();
};