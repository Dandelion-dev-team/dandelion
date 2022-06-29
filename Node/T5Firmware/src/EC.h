#pragma once
#include "SensorModule.h"
#include <MicroSDCardOperations.h>
#include <Preferences.h>
#include <Display.h>

extern MicroSDCardOperations cardOperation;
extern char messageBuffer[256];
extern Preferences preferences;
extern Display ui;

class EC : public SensorModule
{
public:
    void initialise(uint8_t);
    void getReadings(float);
    
private: 
    float coeffs[3];
    void getCoefficiants(float (&)[3], bool = false);
};