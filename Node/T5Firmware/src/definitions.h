#pragma once

#define DEBUG 1 // Set to 0 in normal operation to minimise Serial messages
#define TOP 0
#define MIDDLE 12
#define BOTTOM 27
#define SET_1 26
#define SET_2 25
#define SET_3 33
#define SCL 22
#define SDA 21
#define DATA1 19        // Used to be 36
#define ANALOGUE1 32    // Used to be ANALOGUE
#define ANALOGUE2 34    // Used to be SPARE / DUMMY
#define ANALOGUE3 36    // Used to be DATA2 19
#define BUTTONPIN 39
#define BLOCKSIZE 16
#define MAXMESSAGESIZE 1024
#define SENSORMODE 0
#define UIMODE 1
#define BORDER 1
#define PADDING 5
#define VOFFSET 14
#define INVALID -999
#define INVALID_STR "-999"
#define SEALEVELPRESSURE_HPA 1013.25
#define VREF 1.1               // analog reference voltage(Volt) of the ADC. 1.1V by design: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/adc.html#adc-calibration
#define SCOUNT 30              // sum of sample point
#define ESPADC 4096.0          // the esp Analog Digital Convertion value
#define ESPVOLTAGE 3300        // the esp voltage supply value
#define uS_TO_S_FACTOR 1000000 // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 3600     // Time ESP32 will go to sleep (in seconds)
#define SD_CS 13
#define SD_MOSI 15
#define SD_MISO 2
#define SD_SCK 14
#define FTP_USER "dan"
#define FTP_PASSWORD "delion"
#define VERSION 0.9

extern const char *KEY;
