#pragma once
#include "SensorModule.h"
#include <SHTSensor.h>

class SHTC3 : public SHTSensor, public SensorModule
{
public:
    SHTC3() : SHTSensor(SHTSensor::SHTC3) {} 
    void initialise();
    void getReadings();
};