#pragma once
#include <ArduinoJson.h>
#include <map>
#include <iterator>
#include <WiFiConnection.h>

class DataTransformation
{
public:
    void serialise(std::map <String, float> readings);
};