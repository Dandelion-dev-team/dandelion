#include "SensorModule.h"
#include <TSL2591.h>
#include <BME280.h>
// #include <DS18B20.h>
// #include <TGSMeter.h>
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
BME280 bmeSensor;

// /*In this class, readings are taken from each sensor, with the values returned stored in a map.
// * the key-value pair in the map is String-float where string is the name of the type of measurement being recorded and 
// * float is the measurement value itself. When all readings have been taken, the map is sent as an argument to the 
// * DataTransformation class.
// */

// //Derived sensor sub-class instances
// TSL2591 luminositySensor;
// BME280 multiPurposeSensor;
// DS18B20 substrateTemperatureSensor;
// TGSMeter tgsMeter;

// //Map for storing readings and the name of measurement type
// std::map <String, float> readings; 

// //DataTransformation instance variable to access the serialise method it provides.
// DataTransformation dt;

void SensorModule::initialise()
{
    // luminositySensor.initialise();
    // multiPurposeSensor.initialise();
    // substrateTemperatureSensor.initialise();
    // tgsMeter.initialise();
    tsl.begin();
    tsl.setGain(TSL2591_GAIN_MED);
    tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
    bmeSensor.initialise();
    delay(1000);
    getReadings();
}

float SensorModule::getReadings()
{
  //TSL
  uint16_t x = tsl.getLuminosity(TSL2591_VISIBLE);
  Serial.print(F("[ ")); Serial.print(millis()); Serial.print(F(" ms ] "));
  Serial.print(F("Luminosity: "));
  Serial.println(x, DEC);

  bmeSensor.getReadings();

  return 0;
}

// float SensorModule::getReadings()
// {
//     readings["luminosity"] = luminositySensor.getReadings();
//     delay(500);
    
//     readings["temperature"] = multiPurposeSensor.getReadings(0);
//     delay(500);
//     readings["pressure"] = multiPurposeSensor.getReadings(1);
//     delay(500);
//     readings["altitude"] = multiPurposeSensor.getReadings(2);
//     delay(500);
//     readings["humidity"] = multiPurposeSensor.getReadings(3);

//     // readings["substrate temperature"] = substrateTemperatureSensor.getReadings();

//     readings["electrical conductivity"] = tgsMeter.getReadings();

//     delay(500);

//     dt.serialise(readings);

//     return 0;
// }