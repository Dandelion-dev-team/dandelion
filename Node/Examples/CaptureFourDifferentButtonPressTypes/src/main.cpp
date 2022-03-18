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

#define BUTTON_PIN 39
Button2 button;

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);

void handler(Button2& btn);
void IRAM_ATTR btnClick()
{
  // button.loop();
  Serial.println("Button pressed");
}

void setup()
{    
    SPI.begin(EPD_SCLK, EPD_MISO, EPD_MOSI);
    display.init();
    display.setRotation(1);

    Serial.begin(115200);
    delay(50);

    pinMode(39, INPUT);
    attachInterrupt(39, btnClick, FALLING);

    button.begin(BUTTON_PIN);
    button.setClickHandler(handler);
    button.setClickHandler(handler);
    button.setDoubleClickHandler(handler);
    button.setTripleClickHandler(handler);
    button.setLongClickHandler(handler);
}

void loop()
{
    button.loop();
}

void handler(Button2& btn)
{
  switch (btn.getClickType())
  {
    case SINGLE_CLICK:
      break;
    
    case DOUBLE_CLICK:
      Serial.print("double ");
      break;
    
    case TRIPLE_CLICK:
      Serial.print("triple ");
      break;
    
    case LONG_CLICK:
      Serial.print("long ");
      break;
  }

  Serial.print("click");
  Serial.print(" (");
  Serial.print(btn.getNumberOfClicks());    
  Serial.println(")");
}