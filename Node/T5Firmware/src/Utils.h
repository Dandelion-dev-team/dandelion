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
#include <driver/adc.h>
#include <esp_adc_cal.h>
#include <soc/efuse_reg.h>
#include <tuple>

class Utils
{
public:
    void initialise_pins();
    unsigned long select(uint8_t);
    void leftPad(std::string &, size_t, const char);
    void printHex(uint8_t *, size_t);
    // uint8_t get_mode();
    float get_battery_percent();
    void reset_adc();
    int getMedianNum(int bArray[], int iFilterLen);
    String getSystemTime();
    time_t stringToDatetime(String);
    void setSystemTime(time_t);
    void saveToPreferences(char *key, String);
    void saveToPreferences(char *key, float);
    void saveToPreferences(char *key, int);
    String getFromPreferences(char *);
    float getFromPreferences(char *, float);
    int getFromPreferences(char *, int);
    void removeFromPreferences(char *key);
    String urldecode(String);
    char *to_string(float);
    char *to_string(int);
    float mean(std::vector<float> values);
    float mean(std::vector<int> values);
    float variance(std::vector<float> values);
    float variance(std::vector<int> values);
    std::tuple<float, float> analogReadStats(uint8_t);
    float roundf(float, uint8_t);
    // static uint32_t read_efuse_vref();
};