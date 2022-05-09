#include "SensorModule.h"

extern Utils utils;
extern DynamicJsonDocument data;

/*In this class, readings are taken from each sensor, with the values returned stored in a map. The data types of the
* key-value pair in the map is String-float where String is the name of the type of measurement being recorded and 
* float is the measurement value itself. When all readings have been taken, the map is sent as an argument to the 
* appropriate method in the DataTransformation class.
*/

void SensorModule::initialise(uint8_t) {}
void SensorModule::getReadings() {}

void SensorModule::addReadingsToJSON(char *cubeLevel) {
    for (auto const &reading : readings)
    {
        data[cubeLevel][reading.first] = reading.second;
    }
}