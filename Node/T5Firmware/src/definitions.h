#pragma once
#include <stdint.h>

#define DEBUG 1 // Set to 0 in normal operation to minimise Serial messages

//Pins
#define SET_1 26
#define SET_2 25
#define SET_3 33
#define SCL 22
#define SDA 21
#define DATA1 19
#define ANALOGUE1 32
#define ANALOGUE2 34
#define ANALOGUE3 27
#define BUTTONPIN 39
#define SD_CS 13
#define SD_MOSI 15
#define SD_MISO 2
#define SD_SCK 14

// levels
#define TOP 0
#define MIDDLE 1
#define BOTTOM 2

// Data controls
#define BLOCKSIZE 16
#define MAXMESSAGESIZE 2048

// Node modes
#define SENSORMODE 0
#define CONFIGMODE 1
#define RESETMODE 2
#define PHMODE 3

// Display constants
#define BORDER 1
#define PADDING 5
#define LARGE_PADDING 7
#define VOFFSET 14
#define LARGE_VOFFSET 20
#define DIGIT_PADDING 

// Data values
#define INVALID -999
#define INVALID_STR "-999"
#define NO_TIME "TIME NOT SET......."

// Analogue data conversion values
#define VREF 1.1                        // analog reference voltage(Volt) of the ADC. 1.1V by design: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/adc.html#adc-calibration
#define SCOUNT 30                       // sum of sample point
#define ESPADC 4096.0                   // the esp Analog Digital Convertion value
#define ESPVOLTAGE 3300                 // the esp voltage supply value

// #define VREF_OFFSET 1100                // These five lines from https://github.com/chegewara/esp32-AWSFreeRTOS-wifi-provisioning-demo/blob/master/lib/third_party/mcu_vendor/espressif/esp-idf/components/esp_adc_cal/esp_adc_cal.c
// #define VREF_REG EFUSE_BLK0_RDATA4_REG  // Required for reading VREF value from eFuse
// #define VREF_MASK 0x1F
// #define VREF_STEP_SIZE 7
// #define VREF_FORMAT 0

// Deep sleep values
#define uS_TO_S_FACTOR 1000000 // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 3600     // Time ESP32 will go to sleep (in seconds)
// #define TIME_TO_SLEEP 10 // Time ESP32 will go to sleep (in seconds)

// Default FTP credentials
#define FTP_USER "dan"
#define FTP_PASSWORD "delion"

// Firmware version
#define VERSION 1.0

// Default calibration values
// Names are ec = electrical conductivity, ph = pH, st = substrate temperature
//           t = top, m = middle, b = bottom, h = top high range
//           s = slope, o = offset, seq = sequence

#define ECBX2 0.000427
#define ECBX 4.193204
#define ECBC 0.000216
#define ECMX2 0.00081
#define ECMX 0.760879
#define ECMC -0.000420
#define ECTX2 0.12
#define ECTX  -325.44
#define ECTC  217580.0
#define ECHX2 0.04579
#define ECHX -29.671642
#define ECHC -97547.14

#define PHTS 0.007
#define PHTO -1.97
#define PHMS 0.007
#define PHMO -3.23
#define PHBS 0.007
#define PHBO -5.73
#define STTSEQ 0
#define STMSEQ 1
#define STBSEQ 2

// Sensor reading control
#define MAXLOOKBACK 5               // Number of timesteps over which to calculate the gradient when deciding if the pH readins have stabilised
#define MAXGRADIENT 2               // Threshold below which the pH readings are deemed to be settled
#define TIMEOUT 100                 // Signal value that is returned if a timeout occurs (ie instead of a level or pin number)
#define EC_VOLTAGE_THRESHOLD 1600   // Because of interference from the pH sensor, the top-level EC sensor gives readings in two separate ranges

// Main menu options
#define READ_PH 0
#define CONFIG_MODE 1
#define CALIBRATE_EC 2
#define CALIBRATE_TEMP 3

// Global variables (see definitions.cpp)
extern const char *KEY;                 // AES128 key
extern const uint8_t LEVELS[3];         // Array representing the cube levels to help with iteration
extern const char* LEVELNAMES[3];       // Array representing the level names in the correct order
extern const uint8_t ANALOGUEPINS[3];   // Array representing the analogue data pins in order of level (TOP, MIDDLE, BOTTOM)
extern const char* MAINMENU[4];         // Main options availableon starting ther app
