#pragma once
#include <mySD.h>
#include <ArduinoJson.h>
#include <WifiConnection.h>

class MicroSDCardOperations
{
public:
    void storeJsonOnFile(String, const char*);
    void getUnsentReadings();
};