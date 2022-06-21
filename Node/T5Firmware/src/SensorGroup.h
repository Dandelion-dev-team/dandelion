#pragma once

#include <Arduino.h>
#include <ArduinoJson.h>
#include <map>
#include <math.h>
#include <Utils.h>
#include "GenericSensor.h"

class SensorGroup
{
    public:
        std::map<uint8_t, GenericSensor> sensors;   // Map of the sensors in the group. The key is the natural ordering of the sensors (see for example the way DS18B20 priobes are recognised)
        
        bool initialisationSuccessful;              // Boolean flag that is checked when taking readings

        virtual void initialise(uint8_t = 0);       // used by the sensor subclasses of this base class
        void getReadings();                         // virtual as it must be implemented by all derived classes

        void addReadingsToJSON();                   // Adds the readings to the JSON data structure
};