#if defined(__AVR__)
#include <avr/pgmspace.h>
#elif defined(__PIC32MX__)
#define PROGMEM
#elif defined(__arm__)
#define PROGMEM
#endif

#include <Arduino.h>

const uint8_t WiFiDisconnectedIcon[] PROGMEM = {
// 'no_wifi_30x22', 30x22px
// 'no_wifi_30x22', 30x22px
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x07, 0x06, 0x00, 0x00, 0xff, 0xfc, 0x00, 
0x03, 0xf0, 0xfc, 0x00, 0x07, 0x00, 0x3f, 0x00, 0x0e, 0x00, 0x73, 0x80, 0x38, 0x00, 0xe1, 0xc0, 
0x30, 0x3f, 0xe0, 0xe0, 0x00, 0xff, 0xf0, 0x00, 0x01, 0xc3, 0x3c, 0x00, 0x03, 0x06, 0x0c, 0x00, 
0x02, 0x0c, 0x04, 0x00, 0x00, 0x1f, 0x80, 0x00, 0x00, 0x3f, 0xc0, 0x00, 0x00, 0x70, 0xe0, 0x00, 
0x00, 0xe0, 0x00, 0x00, 0x01, 0xc6, 0x00, 0x00, 0x03, 0x87, 0x00, 0x00, 0x07, 0x06, 0x00, 0x00, 
0x06, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00
};