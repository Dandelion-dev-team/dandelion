#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <time.h>
#include <ArduinoJson.h>
#include <MicroSDCardOperations.h>
#include <Display.h>
#include <ctime>

class WiFiConnection
{
public:
    void sendDataToServer(DynamicJsonDocument&);
    void sendUnsentReadings(DynamicJsonDocument&);
    void connectToWiFi();
};