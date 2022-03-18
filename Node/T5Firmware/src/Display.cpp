#include <Display.h>

 GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
 GxEPD_Class  display(io, EPD_RSET, EPD_BUSY);

void Display::setupDisplay()
{
    delay(2000);

    display.init();
    display.setRotation(1); //Sets rotation to landscape, where the bottom of the display == side that the buttons are on.

    display.fillScreen(GxEPD_WHITE);
    display.drawBitmap(100, 0, DandelionLogo, 50, 22, GxEPD_BLACK);
    display.drawBitmap(0, 0, WiFiDisconnectedIcon, 30, 22, GxEPD_BLACK);
    display.update();
}

void Display::enterUserInteractionMode()
{
    display.init();
    display.setRotation(1);
    const GFXfont *f;
    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    display.setFont(f);
    display.setCursor(50, 50);
    display.println("User Interaction Mode entered");
    display.update();
    delay(8000); //allow time for user to make more button presses while in UI mode.
}

void Display::updateWiFiIcon(bool connected)
{
    if(connected) //set icon on e-paper display to WiFiConnectedIcon.
    {
        delay(2000);

        display.init();
        display.setRotation(1);

        display.fillScreen(GxEPD_WHITE);
        display.drawBitmap(100, 0, DandelionLogo, 50, 22, GxEPD_BLACK);
        display.drawBitmap(0, 0, WiFiConnectedIcon, 30, 22, GxEPD_BLACK);
        display.update();
    }
    else //set icon on e-paper display to WiFiDisconnectedIcon.
    {
        delay(2000);

        display.init();
        display.setRotation(1); //Sets rotation to landscape, where the bottom of the display == side that the buttons are on.

        display.fillScreen(GxEPD_WHITE);
        display.drawBitmap(100, 0, DandelionLogo, 50, 22, GxEPD_BLACK);
        display.drawBitmap(0, 0, WiFiDisconnectedIcon, 30, 22, GxEPD_BLACK);
        display.update();
    }
}