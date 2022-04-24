#pragma once
#include <Arduino.h>
#include <ArduinoJson.h>
#include <MicroSDCardOperations.h>
#include <DataTransformation.h>
#include <Utils.h>
#include <vector>

class ProcessReadings
{
public:
    bool sendToServer(String);
};