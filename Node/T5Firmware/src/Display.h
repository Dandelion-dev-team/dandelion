#pragma once
#define LILYGO_T5_V213
#include <Arduino.h>
#include <boards.h>
#include <GxEPD.h>
#include <GxDEPG0213BN/GxDEPG0213BN.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include <definitions.h>
#include <Utils.h>
#include <Button2.h>

//Fonts
#include <Fonts/FreeMonoBold9pt7b.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMonoBold18pt7b.h>
#include <Fonts/FreeMonoBold24pt7b.h>

//Images:
#include <DandelionLogo.h>
#include <WiFiConnectedIcon.h>
#include <WiFiDisconnectedIcon.h>
#include <Battery0.h>
#include <Battery30.h>
#include <Battery60.h>
#include <Battery100.h>
#include <BatteryCharging.h>

class Display
{
public:
    int16_t message_box_0[4] = {2, 40, 246, 22};
    int16_t message_box_1[4] = {2, 60, 246, 22};
    int16_t message_box_2[4] = {2, 80, 246, 22};
    int16_t message_box_3[4] = {2, 100, 246, 22};

    int16_t *boxes[4] = {
        message_box_0,
        message_box_1,
        message_box_2,
        message_box_3};

    void setupDisplay();
    void update_display();
    void displayLogo();
    void displayBattery(float);
    void displayWiFiIcon(bool);
    // void displayMessage(const char *, uint8_t = 1, bool = false);
    void displayText(const char *, int16_t [4], bool = false, bool = false, bool = false, const GFXfont * = &FreeMonoBold9pt7b);
    void menu(const char* [], uint8_t, uint8_t);
    void clearScreen();
    void calibratePH();
    void proceed(const char *, const char *, uint16_t);
    int16_t numericInput(const char *, uint16_t, uint8_t = 0);
    void numericOptions(uint8_t selected = 0);
};
