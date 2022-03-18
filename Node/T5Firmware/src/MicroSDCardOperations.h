#pragma once
#include <mySD.h>
#include <ArduinoJson.h>
#include <WiFiConnection.h>

class MicroSDCardOperations
{
public:
    void storeJsonOnFile(String, const char*);
    void getUnsentReadings();
    DynamicJsonDocument getConfigData();
};