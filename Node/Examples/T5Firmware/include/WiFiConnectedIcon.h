#if defined(__AVR__)
#include <avr/pgmspace.h>
#elif defined(__PIC32MX__)
#define PROGMEM
#elif defined(__arm__)
#define PROGMEM
#endif

#include <Arduino.h>

const uint8_t WiFiConnectedIcon[] PROGMEM = {
// 'wifi_30x22', 30x22px
// 'wifi_30x22', 30x22px
0x00, 0x0f, 0x80, 0x00, 0x00, 0xff, 0xf8, 0x00, 0x03, 0xff, 0xff, 0x00, 0x07, 0xc0, 0x0f, 0x80, 
0x1e, 0x00, 0x03, 0xe0, 0x3c, 0x00, 0x00, 0xf0, 0x38, 0x1f, 0xe0, 0x70, 0x00, 0x7f, 0xf8, 0x00, 
0x01, 0xf0, 0x7e, 0x00, 0x03, 0xc0, 0x0f, 0x00, 0x07, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x00, 
0x00, 0x1f, 0xe0, 0x00, 0x00, 0x3f, 0xf0, 0x00, 0x00, 0x70, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07, 0x80, 0x00, 0x00, 0x07, 0x80, 0x00, 
0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};