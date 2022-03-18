#include "SensorModule.h"
#include <TSL2591.h>
#include <BME280.h>
#include <DS18B20.h>
#include <TGSMeter.h>
// #include <PHSensor.h>

/*In this class, readings are taken from each sensor, with the values returned stored in a map.
* the key-value pair in the map is String-float where string is the name of the type of measurement being recorded and 
* float is the measurement value itself. When all readings have been taken, the map is sent as an argument to the 
* DataTransformation class.
*/

//Derived sensor sub-class instances
TSL2591 luminositySensor;
BME280 multiPurposeSensor;
DS18B20 substrateTemperatureSensor;
TGSMeter tgsMeter;
// PHSensor pHSensor;

//Map for storing readings and the name of measurement type
std::map <String, float> readings;

//DataTransformation instance variable to access the serialise method it provides.
DataTransformation dt;

void sendReadingsTest(); //only needed so its within scope of getReadingsSet2()

void SensorModule::initialise(){} //need to implement

float SensorModule::getReadings(){return 0;} //need to implement

void SensorModule::initialiseSet1()
{
    luminositySensor.initialise();
    multiPurposeSensor.initialise();
    // //initialise water level sensor
    // tgsMeter.initialise();

}

void SensorModule::initialiseSet2()
{
    //substrateTemperatureSensor.initialise();
    //intialise humidity sensor
    //initialise moisture sensor
}

void SensorModule::initialiseSet3()
{
    // pHSensor.initialise();
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
}

void SensorModule::getReadingsSet2()
{
    readings["set2sensor"] = 90210;
    sendReadingsTest();
}

void sendReadingsTest()
{
    dt.serialise(readings);
}