#pragma once
#define LILYGO_T5_V213
#include <Arduino.h>
#include <boards.h>
#include <GxEPD.h>
#include <GxDEPG0213BN/GxDEPG0213BN.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include <definitions.h>

//Fonts
#include <Fonts/FreeMonoBold9pt7b.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMonoBold18pt7b.h>
#include <Fonts/FreeMonoBold24pt7b.h>

//Images:
#include <DandelionLogo.h>
#include <WiFiConnectedIcon.h>
#include <WiFiDisconnectedIcon.h>

class Display
{
public:
    void setupDisplay();
    void update_display();
    void enterUserInteractionMode();
    void displayLogo();
    void displayWiFiIcon(bool);
    void displayMessage(char *, uint8_t = 1, bool = false);
};


