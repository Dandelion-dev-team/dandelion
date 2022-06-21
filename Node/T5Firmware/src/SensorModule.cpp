/// Abstract parent class for individual sensors.

#include "SensorModule.h"

extern Utils utils;
extern DynamicJsonDocument data;

void SensorModule::initialise(uint8_t) {}
void SensorModule::getReadings() {}

void SensorModule::addReadingsToJSON(char *cubeLevel) {
    for (auto const &reading : readings)
    {
        data[cubeLevel][reading.first] = reading.second;
    }
}
