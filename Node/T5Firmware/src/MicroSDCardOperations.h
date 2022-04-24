#pragma once
#include <mySD.h>
#include <ArduinoJson.h>
#include <WiFiConnection.h>
#include <Preferences.h>
#include <Utils.h>
#include <vector>

class MicroSDCardOperations
{
public:
    void storeJsonOnFile(const String, const char*);
    std::vector<String> getUnsentReadings();
    void deleteUnsentFile();
    DynamicJsonDocument getConfigData();
    void writeConfig(DynamicJsonDocument);
    boolean insecureWifiDetails(DynamicJsonDocument);
    DynamicJsonDocument setWifiDetails(DynamicJsonDocument, const char *, const char *);
    DynamicJsonDocument storeWifiDetailsInEeprom(DynamicJsonDocument);
    DynamicJsonDocument getWifiDetailsFromEeprom(DynamicJsonDocument);
    void putConfig(String, const char *);
    void putConfig(String, const int);
    void putConfig(String, const float);
    void putConfig(String, const bool);
    void putConfig(String, String, const char *);
    void putConfig(String, String, const int);
    void putConfig(String, String, const float);
    void putConfig(String, String, const bool);
};