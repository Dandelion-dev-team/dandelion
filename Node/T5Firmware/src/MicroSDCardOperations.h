#pragma once
#include <SD.h>
// #include <FS.h>
#include <ArduinoJson.h>
<<<<<<< Updated upstream
#include <WiFiConnection.h>
#include <Preferences.h>
#include <Utils.h>
#include <vector>
=======
#include <WiFi.h>
#include <Display.h>
#include <Preferences.h>
#include <Utils.h>
#include <vector>
#include "definitions.h"
#include "Update.h"
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
    void updateFromSD();
>>>>>>> Stashed changes
    void putConfig(String, const char *);
    void putConfig(String, const int);
    void putConfig(String, const float);
    void putConfig(String, const bool);
    void putConfig(String, String, const char *);
    void putConfig(String, String, const int);
    void putConfig(String, String, const float);
    void putConfig(String, String, const bool);
};