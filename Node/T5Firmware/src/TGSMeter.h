#pragma once
#include "SensorModule.h"

class TGSMeter : public SensorModule
{
public:
    void initialise();
    float getReadings();
};