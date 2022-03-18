#define LILYGO_T5_V213

#include <Arduino.h>
#include <boards.h>
#include <GxEPD.h>
#include "foura.h"
#include "threea.h"
#include "twoa.h"
#include <logoSmall.h>
#include <invertedColoursLogoSmall.h>
#include <GxDEPG0213BN/GxDEPG0213BN.h>    // 2.13" b/w  form DKE GROUP
#include GxEPD_BitmapExamples
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);

/*This class shows displaying a custom image on the T5 e-paper display.
* The first part displays the dandelion logo in all 4 corners, the background being
*       black and logo text being white.
* The second part displays the dandelion logo in all 4 corners, the background being
*       white and logo text being black. The colour of the logo is the last argument
*       in the call to display.drawBitmap() where 0 = black and 1 = white
*/

void setup()
{    
    display.init();
    display.setRotation(1);

    display.fillScreen(GxEPD_BLACK);  
    display.drawBitmap(0, 0, logoSmall, 50, 22, GxEPD_WHITE);
    display.drawBitmap(200, 0, logoSmall, 50, 22, 1);
    display.drawBitmap(0, 100, logoSmall, 50, 22, 1);
    display.drawBitmap(200, 100, logoSmall, 50, 22, 1);
    display.update();

    delay(6000);

    display.fillScreen(GxEPD_WHITE);
    display.drawBitmap(0, 0, invertedColoursLogoSmall, 50, 22, GxEPD_BLACK);
    display.drawBitmap(200, 0, invertedColoursLogoSmall, 50, 22, 0);
    display.drawBitmap(0, 100, invertedColoursLogoSmall, 50, 22, 0);
    display.drawBitmap(200, 100, invertedColoursLogoSmall, 50, 22, 0);
    display.update();
}

void loop()
{
    
}