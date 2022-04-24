#include "SensorModule.h"
#include <TSL2591.h>
#include <BME280.h>
#include <DS18B20.h>
#include <TDSMeter.h>
#include <PHSensor.h>

extern Utils utils;

/*In this class, readings are taken from each sensor, with the values returned stored in a map. The data types of the
* key-value pair in the map is String-float where String is the name of the type of measurement being recorded and 
* float is the measurement value itself. When all readings have been taken, the map is sent as an argument to the 
* appropriate method in the DataTransformation class.
*/

//Derived sensor sub-class instances
TSL2591 luminositySensor;
BME280 multiPurposeSensor;
DS18B20 substrateTemperatureSensor;
TDSMeter tdsMeter;
PHSensor pHSensor;

//Map for storing readings and the name of measurement type
std::map <String, float> readings;

//DataTransformation instance variable to access the serialise method it provides.
// DataTransformation dataTransformation;

/* The following method is currently called within this class, however it may instead be declared as a method in SensorModule.h and called from the SensorSelection.cpp class once 
* all readings have been taken. Currently unable to test readings being taken from all three levels, only one level is possible at this stage.
*/
void sendReadings();

void SensorModule::initialise(){} //virtual method so must be implemented, though it is not used in this class.
float SensorModule::getReadings(){return 0;} //virtual method so must be implemented, though it is not used in this class.

void SensorModule::initialiseSet1()
{
    luminositySensor.initialise();
    multiPurposeSensor.initialise();
    // tdsMeter.initialise(); sensor not currently connected.
    // initialise water level sensor
}

void SensorModule::initialiseSet2()
{
    substrateTemperatureSensor.initialise();
    //intialise humidity sensor
    //initialise moisture sensor
}

void SensorModule::initialiseSet3()
{
    pHSensor.initialise();
}

void SensorModule::getReadingsSet1()
{
    readings["luminosity"] = luminositySensor.getReadings();
    delay(500);
    
    readings["temperature"] = multiPurposeSensor.getReadings(0);
    delay(500);
    readings["pressure"] = multiPurposeSensor.getReadings(1);
    delay(500);
    readings["altitude"] = multiPurposeSensor.getReadings(2);
    delay(500);
    readings["humidity"] = multiPurposeSensor.getReadings(3);

    // readings["electrical conductivity"] = tdsMeter.getReadings();

    //get water level sensor readings

}

void SensorModule::getReadingsSet2()
{
    readings["substrate temp"] = substrateTemperatureSensor.getReadings();
    sendReadings(); //DELETE, FOR TESTING PURPOSES ONLY WHILE getReadingsSet3() IS NOT BEING CALLED.
}

/*Note: This method is not currently being called as the select(LEVEL_1_SELECT, SET_3_SELECT) in the SensorSelection class
* is currently commented out.
*/
void SensorModule::getReadingsSet3()
{
    readings["pH"] = pHSensor.getReadings();
    sendReadings(); //DELETE, FOR TESTING PURPOSES ONLY WHILE getReadingsSet3() IS NOT BEING CALLED.
}

// void sendReadings()
// {
//     /*Please read Future work document in the Node/Documentation folder of the GitHub repository for further 
//     * information on the changes required before this method can be called when the hardware allows for readings
//     * to be taken from multiple Levels at one time.

//     /*Currently, this method is called after the Set 3 sensor's readings has been taken. This works for when readings are only
//     * being taken from one Level, but when the hardware allows for testing to be conducted of taking readings from all Levels 
//     * and Sets, then the getReadingsSet1, 2 and 3 methods will need adapted to allow for knowledge of what Level is calling 
//     * the method.
//     */
//     dataTransformation.serialise(readings);
// }