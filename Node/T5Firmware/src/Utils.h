#pragma once
#include <Arduino.h>
#include <time.h>
#include <ctime>
#include <definitions.h>
#include <Preferences.h>
#include <sys/time.h>
#include <iostream>
#include <string>
#include <sstream>
#include <Display.h>

class Utils
{
public:
    void debug(String, bool=true);
    void debug(int, bool = true);
    void debug(float, bool = true);
    void leftPad(std::string &, size_t, const char);
    void printHex(uint8_t *, size_t);
    uint8_t get_mode();
    float get_battery_percent();
    int getMedianNum(int bArray[], int iFilterLen);
    String getSystemTime();
    time_t stringToDatetime(String);
    void setSystemTime(time_t);
    void saveToPreferences(char *key, String);
    void saveToPreferences(char *key, float);
    String getFromPreferences(char *);
    float getFromPreferences(char *, float);
    String urldecode(String);
};