#pragma once
#include "SensorModule.h"
#include <DFRobot_PH.h>
#include <EEPROM.h>

class PHSensor : public SensorModule
{
public:
    void initialise();
    float getReadings();
};