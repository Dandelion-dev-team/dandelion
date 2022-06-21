/// Abstract parent class for groups of sensors.

#include "SensorGroup.h"

extern Utils utils;
extern DynamicJsonDocument data;

void SensorGroup::initialise(uint8_t) {}
void SensorGroup::getReadings() {}

void SensorGroup::addReadingsToJSON() {
    for (uint8_t level=0; level<3; level++) {
        for (auto const &reading : sensors[level].readings)
        {
            Serial.print("Adding ");
            Serial.print(LEVELNAMES[level]);
            Serial.print(" = ");
            Serial.println(reading.second);
            data[LEVELNAMES[level]][reading.first] = utils.roundf(reading.second, 1);
        }
    }
}
