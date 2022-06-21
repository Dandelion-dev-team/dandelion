#pragma once
#include <Utils.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <Display.h>
#include <Preferences.h>
#include <MicroSDCardOperations.h>

class HttpServer
{
public:
    void handle();
    void status(WiFiClient);
};