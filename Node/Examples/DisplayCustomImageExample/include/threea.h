#if defined(__AVR__)
    #include <avr/pgmspace.h>
#elif defined(__PIC32MX__)
    #define PROGMEM
#elif defined(__arm__)
    #define PROGMEM
#endif

const uint8_t threea[] PROGMEM = {
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xef, 0xff, 0xff, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xfd, 0xff, 
0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xfb, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xfb, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xfe, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xbf, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xfe, 0xff, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x0f, 0x7f, 0xff, 0xff, 0xff, 0xdb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf7, 0xff, 0xfe, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xcf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x0e, 0xff, 0xff, 0xff, 0xff, 0xef, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x85, 0xff, 0xff, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x8f, 0xff, 0xff, 0xff, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xe0, 0x00, 0x3e, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x9f, 0xff, 0xff, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfc, 0x00, 0x00, 0x0f, 0xff, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xcf, 0xff, 0xff, 0xff, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xff, 0xff, 0xe0, 0x00, 0x00, 0x01, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xdf, 0xff, 0xff, 0xff, 0xff, 0xab, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0xff, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xff, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x7f, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x97, 0xeb, 0xff, 0xff, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xff, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x3f, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xff, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x0f, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xab, 0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x07, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x7f, 0xfe, 0x3f, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xab, 0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x7f, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xfd, 0xff, 0xff, 0xff, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xfc, 0x00, 0x08, 0x04, 0x00, 0x00, 0x06, 
0xbd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xfb, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xfc, 0x15, 0x55, 0x58, 0x00, 0x00, 0x49, 
0x47, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x51, 0xff, 0xff, 0xf7, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xf8, 0x0a, 0xaa, 0xc0, 0x00, 0x20, 0x00, 
0x01, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x5d, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xf8, 0x05, 0x55, 0x00, 0x1e, 0x00, 0x00, 
0x00, 0x0f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x3b, 0xff, 0xff, 0xf7, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xf0, 0x01, 0x54, 0x01, 0xf0, 0x00, 0x00, 
0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0xe0, 0x02, 0xa0, 0x07, 0x80, 0x00, 0x00, 
0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x9f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xf7, 0xff, 0xd7, 0xff, 0xff, 0xff, 0xe0, 0x00, 0xa0, 0x1c, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x03, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xb7, 0xfd, 0xbf, 0xff, 0xff, 0xd5, 0xff, 0xff, 0xff, 0x80, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x5f, 0xff, 0xff, 0xf7, 0xff, 0xd7, 0xff, 0xff, 0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0x1f, 0xff, 0xff, 0xe9, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xf7, 0xff, 0xd7, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xf7, 0xff, 0xd5, 0xff, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xfd, 0xff, 0xeb, 0xff, 0xfb, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xf7, 0xff, 0xd5, 0xff, 0xfe, 0xfe, 0x00, 0x00, 0x00, 0x01, 0x94, 0x80, 0x00, 
0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xff, 0xff, 0xeb, 0xff, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x02, 0x25, 0x22, 0x00, 
0x00, 0x00, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x7f, 0xff, 0xff, 0xf7, 0xff, 0xd5, 0xff, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x0a, 0xaa, 0xd4, 0x88, 
0x00, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0x5f, 0xfa, 0xff, 0xeb, 0xff, 0xfd, 0xfe, 0x00, 0x00, 0x00, 0x05, 0x2a, 0xab, 0x50, 
0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xef, 0xff, 0xd5, 0xff, 0xff, 0xfe, 0x00, 0x00, 0x00, 0x14, 0xff, 0x6e, 0xdf, 
0xe0, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x5f, 0xff, 0x9f, 0xfa, 0xff, 0xd5, 0xff, 0xfe, 0xfe, 0x00, 0x00, 0x00, 0x2b, 0xdf, 0xaa, 0xbf, 
0xf0, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xd3, 0xff, 0xfb, 0xfe, 0x00, 0x00, 0x00, 0xad, 0x7f, 0xff, 0xff, 
0xf8, 0x07, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x5f, 0xff, 0x9f, 0xf5, 0x7f, 0xd5, 0xff, 0xff, 0x7e, 0x00, 0x00, 0x01, 0xaa, 0xff, 0xff, 0xff, 
0xfc, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xef, 0xff, 0xd5, 0xff, 0xfb, 0xfe, 0x00, 0x00, 0x26, 0xaf, 0xff, 0xff, 0xff, 
0xfd, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0x9d, 0xbb, 0x7f, 0xe9, 0xff, 0xfe, 0xfe, 0x00, 0x00, 0x54, 0xba, 0xff, 0xff, 0xff, 
0xfe, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xbf, 0xf6, 0xff, 0xd7, 0xff, 0xfd, 0xfe, 0x00, 0x00, 0x22, 0xd7, 0xff, 0xff, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0x9f, 0xfb, 0xff, 0xe9, 0xff, 0xff, 0x7f, 0x00, 0x00, 0x5b, 0xaf, 0xff, 0xff, 0xff, 
0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xbf, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x77, 0xff, 0xbd, 0xba, 0xff, 0xc7, 0xff, 0xfa, 0xff, 0x00, 0x00, 0xa5, 0x7d, 0x7f, 0xff, 0xff, 
0xc1, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x53, 0xff, 0x9f, 0xf7, 0xff, 0xe9, 0xff, 0xff, 0xff, 0x80, 0x00, 0x2e, 0xf7, 0xff, 0xff, 0xff, 
0x80, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x80, 0x00, 0xab, 0xdf, 0xff, 0xff, 0xff, 
0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0xab, 0xbf, 0xff, 0xff, 0xfe, 
0x07, 0xff, 0xff, 0xff, 0xff, 0xff, 0xaa, 0x92, 0x55, 0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x55, 0xff, 0x7f, 0xff, 0xfc, 
0x1f, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x3f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x29, 0x55, 0x40, 0x00, 0xb7, 0x70, 0x00, 0x7f, 0xfe, 
0x7f, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x00, 0x48, 0x08, 0x00, 0x2a, 0x45, 0x57, 0xb5, 0xa0, 0x01, 0x5e, 0xe0, 0x00, 0xff, 0xff, 
0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x00, 0x29, 0x55, 0x0a, 0x11, 0x20, 0x2d, 0x6d, 0x60, 0x00, 0xd7, 0x81, 0x40, 0x3f, 0xff, 
0xff, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x40, 0x01, 0x04, 0x00, 0xa4, 0xaa, 0x82, 0xaa, 0xbb, 0xd0, 0x00, 0xbe, 0x87, 0xff, 0xff, 0xfb, 
0xff, 0x80, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x10, 0xaa, 0x4a, 0xa8, 0x12, 0xab, 0x49, 0x6f, 0xed, 0xa0, 0x01, 0x56, 0x9f, 0xff, 0xff, 0xfa, 
0x81, 0x80, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x41, 0x51, 0x2a, 0xa4, 0xaa, 0xdd, 0x52, 0xb5, 0x5b, 0x50, 0x00, 0xaf, 0xff, 0xff, 0xff, 0xf2, 
0x87, 0xc0, 0x00, 0x01, 0x28, 0x00, 0x00, 0x00, 0x00, 0x01, 0xe1, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x54, 0x85, 0x65, 0x50, 0x0a, 0xab, 0x55, 0x6f, 0xfe, 0x54, 0x01, 0x57, 0xff, 0xff, 0xef, 0xf1, 
0x8f, 0xc0, 0x00, 0x00, 0x85, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf0, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x50, 0x2a, 0xae, 0xaa, 0xab, 0x7d, 0xaa, 0xbf, 0xfd, 0xd2, 0x80, 0x2f, 0xff, 0xf8, 0x3f, 0xf3, 
0x5f, 0xc0, 0x00, 0x01, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x10, 0x8a, 0x55, 0x52, 0xaa, 0xbe, 0xba, 0xaf, 0xfe, 0xee, 0xf0, 0x57, 0xff, 0xd0, 0x9d, 0xb8, 
0x9f, 0xc0, 0x00, 0x01, 0xa2, 0xd2, 0x00, 0x00, 0x00, 0x00, 0xb8, 0x7f, 0xff, 0xff, 0xff, 0xc0, 
0x29, 0x29, 0xfe, 0xa9, 0x15, 0x55, 0xff, 0xff, 0xfb, 0xfd, 0xe0, 0x5f, 0xff, 0x30, 0x8b, 0x79, 
0x7f, 0xe0, 0x00, 0x02, 0x5d, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xc0, 
0x22, 0x54, 0xa3, 0x55, 0xaa, 0xab, 0x5f, 0xdf, 0xff, 0xf6, 0xf8, 0x0b, 0xff, 0x3c, 0x92, 0xfc, 
0xbf, 0xe0, 0x00, 0x01, 0xaf, 0xd1, 0x40, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xc0, 
0x11, 0x53, 0xdf, 0xa8, 0x55, 0x5d, 0xf5, 0xff, 0xff, 0xfd, 0xf0, 0x2f, 0xfe, 0x7d, 0x57, 0x7f, 
0x7f, 0xe0, 0x00, 0x02, 0xbf, 0x84, 0x42, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x29, 0x55, 0xff, 0x44, 0xaa, 0xab, 0xff, 0xff, 0xff, 0xfe, 0xf8, 0x0b, 0xff, 0xfe, 0xaa, 0xbf, 
0xdf, 0xe0, 0x00, 0x01, 0xbf, 0xe2, 0x80, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0xaa, 0x7a, 0x51, 0x4a, 0xae, 0xff, 0xff, 0xff, 0xfd, 0xd4, 0x2f, 0xff, 0xff, 0xd6, 0xff, 
0xff, 0xf0, 0x00, 0x07, 0xdf, 0x85, 0x40, 0x10, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x29, 0x40, 0x0a, 0x08, 0x15, 0x5b, 0xff, 0xff, 0xff, 0x7f, 0xd2, 0x0b, 0xff, 0xff, 0xfd, 0xbf, 
0xff, 0xe0, 0x00, 0x03, 0xab, 0xe8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x5b, 0xa9, 0x05, 0x0a, 0x55, 0x7f, 0xff, 0xb6, 0xfe, 0xcc, 0x97, 0xff, 0xff, 0xf7, 0x7f, 
0xff, 0xf0, 0x00, 0x0b, 0xf4, 0x11, 0x01, 0x50, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x26, 0xbe, 0xd0, 0xab, 0xab, 0xff, 0xff, 0xed, 0xfe, 0x86, 0x09, 0xff, 0xff, 0xff, 0xbf, 
0xff, 0xf8, 0x00, 0x07, 0xec, 0x00, 0x02, 0xb0, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x17, 0xf3, 0xa0, 0x28, 0x3d, 0xfb, 0xff, 0xd7, 0xff, 0x64, 0x96, 0xff, 0xff, 0xff, 0x7f, 
0xbf, 0xf0, 0x00, 0x0f, 0xfa, 0x90, 0x22, 0xa8, 0x00, 0x02, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x25, 0x50, 0xa0, 0x55, 0x2b, 0x7b, 0xef, 0xed, 0xff, 0x9f, 0x01, 0x7f, 0xff, 0xff, 0x7f, 
0xff, 0xf0, 0x00, 0x07, 0xe9, 0xf1, 0x81, 0x54, 0x00, 0x07, 0xc0, 0x3f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x9a, 0xa0, 0x85, 0x5e, 0xc2, 0xee, 0xdf, 0xeb, 0xff, 0x3e, 0x15, 0xff, 0xff, 0xfc, 0xbf, 
0xdf, 0xf0, 0x00, 0x0f, 0xe0, 0x33, 0x00, 0xac, 0x00, 0x0f, 0x80, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x56, 0xaa, 0x00, 0x51, 0x2b, 0x35, 0xbb, 0xf5, 0x55, 0xdd, 0x01, 0x7f, 0xff, 0xfc, 0x7f, 
0xef, 0xf0, 0x00, 0x17, 0xf0, 0x31, 0x01, 0x44, 0x00, 0x0a, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x11, 0x50, 0x04, 0x88, 0x90, 0xd7, 0x57, 0xf5, 0xfe, 0xab, 0x0a, 0xff, 0xff, 0xfb, 0xff, 
0xcf, 0xf0, 0x00, 0x05, 0xfd, 0xe1, 0x02, 0x8c, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x57, 0x6a, 0x11, 0x52, 0xa5, 0x95, 0xff, 0xff, 0xd5, 0xdd, 0x90, 0xbf, 0xff, 0xfb, 0xbf, 
0xf3, 0xe0, 0x00, 0x0e, 0xff, 0xe0, 0xf0, 0x04, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x02, 0x6a, 0xd4, 0x8a, 0x95, 0x5a, 0x4f, 0xfd, 0xff, 0xff, 0x6b, 0x85, 0x7f, 0xff, 0xff, 0x1f, 
0xbb, 0xe0, 0x00, 0x09, 0xff, 0xc0, 0x68, 0x04, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x05, 0x5c, 0x55, 0x55, 0x15, 0x20, 0x10, 0x1f, 0xe0, 0x00, 0x7f, 0x80, 0xbf, 0xff, 0xff, 0xae, 
0x3c, 0xf8, 0x00, 0x06, 0xf7, 0xc0, 0x50, 0x04, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x52, 0x24, 0xa5, 0x52, 0x80, 0x00, 0x7b, 0x80, 0x00, 0xdf, 0x84, 0x7f, 0xff, 0xff, 0x00, 
0x28, 0xc0, 0x00, 0x05, 0xef, 0x80, 0x00, 0x04, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x02, 0x2d, 0xd5, 0x28, 0x28, 0x86, 0x61, 0xaf, 0xdc, 0xc1, 0xe3, 0x81, 0x5f, 0xff, 0xff, 0x00, 
0x16, 0xc0, 0x00, 0x00, 0xaa, 0xf0, 0x40, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x2a, 0xa8, 0x40, 0x89, 0x04, 0x61, 0x19, 0x88, 0x81, 0x86, 0x04, 0x7f, 0xff, 0xfe, 0x00, 
0x10, 0xc0, 0x00, 0x01, 0x5a, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x37, 0x52, 0xa1, 0x50, 0x20, 0x0d, 0x01, 0x99, 0xcf, 0x18, 0x01, 0x2f, 0xff, 0xff, 0x08, 
0x10, 0x80, 0x00, 0x00, 0x42, 0x40, 0x40, 0x00, 0x60, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x9a, 0xa8, 0x00, 0x00, 0x04, 0x80, 0x12, 0x11, 0x02, 0x70, 0x00, 0xb7, 0xff, 0xde, 0x14, 
0x21, 0x80, 0x00, 0x00, 0x20, 0xe0, 0x00, 0x00, 0x20, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x2a, 0xa0, 0xa0, 0x00, 0x88, 0x00, 0x02, 0x23, 0x80, 0x40, 0x02, 0x2a, 0xff, 0x42, 0x88, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x40, 0x00, 0x20, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0xb6, 0x85, 0x00, 0x00, 0x00, 0x00, 0x00, 0x73, 0x1c, 0x00, 0x00, 0xbf, 0xfe, 0x04, 0x90, 
0x81, 0x80, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x09, 0x50, 0x80, 0x00, 0x10, 0x00, 0xa0, 0xa3, 0x00, 0x00, 0x00, 0x2f, 0xfc, 0x01, 0x40, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x02, 0x54, 0x80, 0x00, 0x00, 0x70, 0x09, 0x52, 0xc6, 0x80, 0x00, 0x00, 0x7f, 0xf8, 0x00, 0x00, 
0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x05, 0x02, 0x00, 0x40, 0x54, 0x92, 0xa8, 0x2a, 0xa3, 0xc0, 0x00, 0x01, 0x0f, 0xf8, 0x00, 0x00, 
0xe2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x20, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0xa8, 0x04, 0x01, 0x02, 0x52, 0x97, 0x55, 0x6d, 0x00, 0x00, 0x00, 0x3f, 0xe8, 0x20, 0x01, 
0xc1, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3c, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0x50, 0xab, 0x04, 0x00, 0x00, 0x00, 0x8f, 0xe8, 0x14, 0x8a, 
0xc5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x38, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x08, 0x00, 0x11, 0x10, 0x80, 0x02, 0x28, 0x50, 0x00, 0x00, 0x02, 0x17, 0xd0, 0x5f, 0xf7, 
0xc2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x52, 0x00, 0x54, 0xaa, 0x55, 0x48, 0x4a, 0x80, 0x00, 0x00, 0x00, 0x97, 0xe0, 0x37, 0xff, 
0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x0a, 0xaa, 0xa0, 0xa9, 0x54, 0x55, 0x20, 0xad, 0x00, 0x00, 0x00, 0x02, 0x4b, 0xc0, 0x25, 0xe8, 
0x0b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x2a, 0x0a, 0x0a, 0x2b, 0x52, 0x84, 0xf8, 0x00, 0x00, 0x00, 0x00, 0xa5, 0xc0, 0x28, 0x20, 
0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x55, 0x20, 0x10, 0xa8, 0xad, 0x40, 0xa0, 0x00, 0x00, 0x00, 0x00, 0xa7, 0x85, 0x10, 0x00, 
0xa6, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x08, 0xaa, 0x80, 0x54, 0x2a, 0x90, 0x81, 0x00, 0x00, 0x00, 0x00, 0x01, 0x55, 0xd2, 0x00, 0x10, 
0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 
0x05, 0x55, 0x41, 0x29, 0xa8, 0x0a, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x55, 0xd2, 0x00, 0x00, 
0x2e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x9f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x69, 0x00, 0x50, 0x52, 0xa1, 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0xaa, 0xd5, 0x80, 0x00, 
0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xbf, 0xff, 0xff, 0xff, 0xc0, 
0x05, 0x15, 0x00, 0x09, 0x2a, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x35, 0xea, 0x00, 0x00, 
0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xc0, 
0x00, 0x81, 0x00, 0x00, 0x94, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x5f, 0x7d, 0x44, 0x00, 
0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xc0, 
0x01, 0x14, 0x00, 0x00, 0x55, 0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0xfa, 0xb4, 0x00, 
0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7f, 0xff, 0xff, 0xff, 0xc0, 
0x05, 0x4a, 0x00, 0x00, 0x00, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0x4e, 0x88, 
0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xc0, 
0x12, 0xd0, 0x00, 0x00, 0x01, 0x55, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xfe, 0xb6, 0x80, 
0xe0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0x80, 
0x05, 0x14, 0x00, 0x00, 0x00, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xff, 0x5b, 0x48, 
0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xff, 0xff, 0xff, 0xfe, 0x00, 
0x00, 0xa0, 0x00, 0x00, 0x00, 0x14, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xff, 0xf7, 0x82, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x13, 0xff, 0xff, 0xff, 0xfe, 0x00, 
0x00, 0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x37, 0xff, 0xff, 0xff, 0xfe, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xfc, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xff, 0xff, 0xff, 0xfc, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x40, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xff, 0xff, 0xff, 0xfc, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xfc, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xc0, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xff, 0xff, 0xff, 0xc0, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3f, 0xff, 0xef, 0xbf, 0x40, 0x00, 
0xff, 0xa8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xfe, 0xbf, 0xff, 0x00, 0x00, 
0x00, 0x55, 0x02, 0x12, 0xaa, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0xf5, 0x48, 0x57, 0x20, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x3f, 0xff, 0xff, 0xbf, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xff, 0xff, 0xff, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x3f, 0xdb, 0x60, 0x2f, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0x6d, 0x40, 0x14, 0x95, 0x40, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0xaa, 0x80, 0x00, 0x00, 0x00
};