#pragma once
#include "SensorModule.h"

class TDSMeter : public SensorModule
{
public:
    void initialise(uint8_t);
    void getReadings(float);
};