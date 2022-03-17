/*Libraries added
- adafruit gfx
- GxEPD in lib folder
- Button2
- U8G2_by_adafruit
*/

#define LILYGO_T5_V213

#include <Arduino.h>
#include <boards.h>
#include <GxEPD.h>
#include "foura.h"
#include "threea.h"
#include "twoa.h"
#include "inverted.h"
#include <GxDEPG0213BN/GxDEPG0213BN.h>    // 2.13" b/w  form DKE GROUP
#include GxEPD_BitmapExamples
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include <Button2.h>

#define BUTTON 39
Button2 btn(BUTTON);

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);

int i;

void buttonPressed(Button2 &b)
{

    switch (i)
    {
        case 0: //Full screen Dandelion logo, white text on black background.
        {
            i++;
            display.fillScreen(GxEPD_BLACK); 
            display.drawBitmap(0, 0, foura, 250, 112, 1);
            display.update();
            delay(2000);
            break;
        }

        case 1: //image of the guy who discovered custom image process.
        {
            i++;
            display.fillScreen(GxEPD_BLACK);  
            display.drawBitmap(0, 0, threea, 250, 122, 1);
            display.update();
            delay(2000);
            break;
        }

        case 2: //dandelion logo halved in size. possibly look to place it in centre of display.
        {
            i++;
            display.fillScreen(GxEPD_BLACK);  
            display.drawBitmap(0, 0, twoa, 125, 61, 1);
            display.update();
            delay(2000);
            break;
        }

        case 3: //black text with clear background
        {
            i++;
            display.fillScreen(GxEPD_BLACK); 
            display.drawBitmap(0, 0, inverted, 250, 122, 1);
            display.update();
            delay(2000);
            break;
        }

        default:
        {
            i = 0;
        }
    }
    
}

void setup()
{    
    SPI.begin(EPD_SCLK, EPD_MISO, EPD_MOSI);
    display.init();
    display.setRotation(1);

    i = 0;
    Serial.begin(115200);
    delay(50);
    btn.setPressedHandler(buttonPressed);

    Serial.println("test");
}

void loop()
{
    btn.loop();
}