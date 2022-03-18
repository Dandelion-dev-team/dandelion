#define LILYGO_T5_V213

#include <Arduino.h>
#include <boards.h>
#include <GxEPD.h>
#include <SD.h>
#include <FS.h>

#include <GxDEPG0213BN/GxDEPG0213BN.h>    // 2.13" b/w  form DKE GROUP

#include GxEPD_BitmapExamples
#include <threea.h>

// FreeFonts from Adafruit_GFX
#include <Fonts/FreeMonoBold9pt7b.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMonoBold18pt7b.h>
#include <Fonts/FreeMonoBold24pt7b.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include <WiFi.h>

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);

void showFont(const char name[], const GFXfont *f);
void drawCornerTest(void);

void setup()
{
    Serial.begin(115200);
    Serial.println();
    Serial.println("setup");

    SPI.begin(EPD_SCLK, EPD_MISO, EPD_MOSI);

    display.init();
    display.setTextColor(GxEPD_BLACK);

    display.setRotation(0);
    display.fillScreen(GxEPD_WHITE);
    display.drawExampleBitmap(BitmapExample1, 0, 0, GxEPD_WIDTH, GxEPD_HEIGHT, GxEPD_BLACK);
    display.setCursor(20, display.height() - 15);

#if defined(_HAS_SDCARD_)
    display.setRotation(1);
#endif

    // String sizeString = "SD:" + String(SD.cardSize() / 1024.0 / 1024.0 / 1024.0) + "G";
    // display.println(rlst ? sizeString : "SD:N/A");

    // int16_t x1, x2;
    // uint16_t w, h;
    // String str = GxEPD_BitmapExamplesQ;
    // str = str.substring(2, str.lastIndexOf("/"));
    // display.getTextBounds(str, 0, 0, &x1, &x2, &w, &h);
    // display.setCursor(display.width() - w - 5, display.height() - 15);
    // display.println(str);

    display.update();

    delay(1000);

}

void loop()
{
    //drawCornerTest();

    int i = 0;
    while (i < 4) {
        display.setRotation(1);
        showFont("FreeMonoBold9pt7b", &FreeMonoBold9pt7b);
        //showFont("FreeMonoBold18pt7b", &FreeMonoBold18pt7b);
        //showFont("FreeMonoBold24pt7b", &FreeMonoBold24pt7b);
        i++;
    }

    //display.fillScreen(GxEPD_WHITE);

    //display.update();

}

void showFont(const char name[], const GFXfont *f)
{
    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    display.setFont(f);
    display.setCursor(0, 0);
    display.println();
    //display.println(name); this is printing the name of the font
    display.println("Welcome to Dandelion");
    display.update();
    delay(5000);
}

// void drawCornerTest()
// {
//     display.drawCornerTest();
//     delay(5000);
//     uint8_t rotation = display.getRotation();
//     for (uint16_t r = 0; r < 4; r++) {
//         display.setRotation(r);
//         display.fillScreen(GxEPD_WHITE);
//         display.fillRect(0, 0, 8, 8, GxEPD_BLACK);
//         display.fillRect(display.width() - 18, 0, 16, 16, GxEPD_BLACK);
//         display.fillRect(display.width() - 25, display.height() - 25, 24, 24, GxEPD_BLACK);
//         display.fillRect(0, display.height() - 33, 32, 32, GxEPD_BLACK);
//         display.update();
//         delay(5000);
//     }
//     display.setRotation(rotation); // restore
// }