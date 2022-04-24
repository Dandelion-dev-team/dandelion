#pragma once
#include <Arduino.h>
#include <time.h>
#include <ctime>
#include <definitions.h>

class Utils
{
public:
    void debug(String, bool=true);
    void leftPad(std::string &, size_t, const char );
    void printHex(uint8_t *, size_t);
    uint8_t get_mode();
    float get_battery_percent();
};