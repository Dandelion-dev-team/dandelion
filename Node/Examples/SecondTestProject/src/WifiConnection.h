#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <time.h>
#include <ArduinoJson.h>
#include <MicroSDCardOperations.h>

class WifiConnection
{
public:
    void sendDataToServer(DynamicJsonDocument&);
    void sendUnsentReadings(DynamicJsonDocument&);
};