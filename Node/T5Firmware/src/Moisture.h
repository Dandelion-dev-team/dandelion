#pragma once
#include "SensorModule.h"

class Moisture : public SensorModule
{
public:
    void initialise(uint8_t);
    void getReadings();
};