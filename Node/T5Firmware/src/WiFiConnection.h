#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <time.h>
#include <ArduinoJson.h>
#include <MicroSDCardOperations.h>
#include <Display.h>
#include <ctime>
#include <Utils.h>
#include <sstream>
<<<<<<< Updated upstream
#include <ESP32Time.h>
=======
>>>>>>> Stashed changes

class WiFiConnection
{
public:
    void sendDataToServer(DynamicJsonDocument&);
    bool sendData(uint8_t *, uint16_t);
    // void sendUnsentReadings(DynamicJsonDocument &);
    bool connectToWiFi();
    String getTime();
};