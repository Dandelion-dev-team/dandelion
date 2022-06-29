#pragma once

#include <Arduino.h>
#include <ArduinoJson.h>
#include <map>
#include <math.h>
#include <Utils.h>

class SensorModule
{
    protected:
        uint8_t cubeLevel = TOP;                      // Used to differentiate between sensors that are read as a group (pH, substrate temperature)

    public:
        std::map<String, float> readings;           // Map for storing readings and the name of measurement type
        bool initialisationSuccessful;              // Boolean flag that is checked when taking readings

        virtual void initialise(uint8_t = 0);       // used by the sensor subclasses of this base class
        void getReadings();                         // virtual as it must be implemented by all derived classes

        void addReadingsToJSON(char *);             // Adds the readings to the appropriate cube level in the JSON data structure

};