/// Abstract parent class for individual sensors.

#include "SensorModule.h"

extern Utils utils;
extern DynamicJsonDocument data;

void SensorModule::initialise(uint8_t) {}
void SensorModule::getReadings() {}

void SensorModule::addReadingsToJSON(char *cubeLevelName) {
    for (auto const &reading : readings)
    {
        data[cubeLevelName][reading.first] = reading.second;
    }
}
