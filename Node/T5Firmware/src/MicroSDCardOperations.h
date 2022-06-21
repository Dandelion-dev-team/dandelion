#pragma once
#include <SD.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <Display.h>
#include <Preferences.h>
#include <Utils.h>
#include <vector>
#include "definitions.h"
#include "Update.h"

class MicroSDCardOperations
{
public:
    void appendToFile(const String, const char*);
    std::vector<String> getUnsentReadings();
    void deleteUnsentFile();
    DynamicJsonDocument getConfigData();
    void writeConfig(DynamicJsonDocument);
    boolean insecureWifiDetails(DynamicJsonDocument);
    DynamicJsonDocument setWifiDetails(DynamicJsonDocument, const char *, const char *);
    DynamicJsonDocument storeWifiDetailsInEeprom(DynamicJsonDocument);
    DynamicJsonDocument getWifiDetailsFromEeprom(DynamicJsonDocument);
    void updateFromSD();
    void putConfig(String, const char *);
    void putConfig(String, const int);
    void putConfig(String, const float);
    void putConfig(String, const bool);
    void putConfig(String, String, const char *);
    void putConfig(String, String, const int);
    void putConfig(String, String, const float);
    void putConfig(String, String, const bool);
    void log(const char *, const char * = "");
};