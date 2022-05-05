#pragma once
#include "SensorModule.h"
#include "DFRobot_ESP_PH.h"
#include <EEPROM.h>

class PHSensor : public SensorModule
{
public:
    void initialise(uint8_t);
    void getReadings();
};