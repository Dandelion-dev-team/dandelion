#pragma once
#include <ArduinoJson.h>
#include <map>
#include <iterator>
#include <WifiConnection.h>

class DataTransformation
{
public:
    void serialise(std::map <String, float> readings);
};