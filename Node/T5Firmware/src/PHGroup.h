#pragma once
#include "SensorGroup.h"

class PHGroup : public SensorGroup
{
public:
    void initialise();
    void getReadings();
    void calibrate();
};