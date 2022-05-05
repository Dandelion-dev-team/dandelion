#pragma once
#include <ArduinoJson.h>
#include <Utils.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <Display.h>
#include <Preferences.h>

class HttpServer
{
public:
    void handle();
    void status(WiFiClient);
};