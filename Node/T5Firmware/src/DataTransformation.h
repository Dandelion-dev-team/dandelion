#pragma once
#include <ArduinoJson.h>
#include <map>
// #include <iterator>
#include <WiFiConnection.h>
#include <Utils.h>
#include "AES128.h"
#include <mbedtls/base64.h>

class DataTransformation
{
public:
<<<<<<< Updated upstream
    DynamicJsonDocument serialise(std::map<String, float> readings);
=======
>>>>>>> Stashed changes
    uint16_t encrypt(unsigned char *, unsigned char[]);
};