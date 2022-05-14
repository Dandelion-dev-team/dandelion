#pragma once
#include "SensorModule.h"
#include <BH1750.h>

class GY30_BH1750 : public BH1750, public SensorModule
{
public:
    void initialise();
    void getReadings();
};