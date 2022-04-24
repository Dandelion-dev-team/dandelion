#include <Display.h>

 GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
 GxEPD_Class  display(io, EPD_RSET, EPD_BUSY);

void displayWiFiIcon(bool);
void displayLogo();

// box_x, box_y, box_w, box_h
uint8_t wifi_box[4] = {0, 0, 30, 22};
uint8_t battery_box[4];
uint8_t logo_box[4] = {90, 0, 50, 22};
uint8_t message_box_1[4] = {2, 60, 246, 22};
uint8_t message_box_2[4] = {2, 80, 246, 22};

void Display::setupDisplay()
{
    display.init();
    display.setRotation(3); // Sets rotation to landscape, where the top of the display == side that the buttons are on.

    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    display.update();
    displayLogo();
    displayWiFiIcon(false);
}

void Display::update_display() {
    display.update();
}

void Display::enterUserInteractionMode()
{
    display.init();
    display.setRotation(3);
    // const GFXfont *f;
    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    display.setFont(&FreeMonoBold9pt7b);
    // display.setFont(f);
    display.setCursor(50, 50);
    display.println("User Interaction Mode entered");
    display.update();
    delay(8000); //allow time for user to make more button presses while in UI mode.
}

void update_area(uint8_t box[4])
{
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void clear_area(uint8_t box[4])
{
    display.fillRect(box[0], box[1], box[2], box[3], GxEPD_WHITE);
    update_area(box);
}

void bitmapBox(const uint8_t bitmap[], uint8_t box[])
{
    clear_area(box);
    display.drawBitmap(box[0], box[1], bitmap, box[2], box[3], GxEPD_BLACK);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void Display::displayLogo()
{
    bitmapBox(DandelionLogo, logo_box);
}

void Display::displayWiFiIcon(bool connected)
{
    // clear_area(wifi_box);
    if (connected) // set icon on e-paper display to WiFiConnectedIcon.
    {
        // display.drawBitmap(0, 0, WiFiConnectedIcon, 30, 22, GxEPD_BLACK);
        // update_area(wifi_box);
        bitmapBox(WiFiConnectedIcon, wifi_box);
    }
    else // set icon on e-paper display to WiFiDisconnectedIcon.
    {
        // display.drawBitmap(0, 0, WiFiDisconnectedIcon, 30, 22, GxEPD_BLACK);
        // update_area(wifi_box);
        bitmapBox(WiFiDisconnectedIcon, wifi_box);
    }
}

void outline(uint8_t box[])
{
    display.drawRect(box[0]+BORDER, box[1]+BORDER, box[2]-BORDER, box[3]-BORDER, GxEPD_BLACK);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void Display::displayMessage(char *message, uint8_t line, bool draw_box)
{
    display.setTextColor(GxEPD_BLACK);
    display.setFont(&FreeMonoBold9pt7b);
    if (line == 1)
    {
        clear_area(message_box_1);
        if (draw_box)
            outline(message_box_1);
        display.setCursor(message_box_1[0] + PADDING, message_box_1[1] + VOFFSET);
        display.print(message);
        display.updateWindow(message_box_1[0], message_box_1[1], message_box_1[2], message_box_1[3], true);
    }
    else
    {
        clear_area(message_box_2);
        if (draw_box)
            outline(message_box_2);
        display.setCursor(message_box_2[0] + PADDING, message_box_2[1] + VOFFSET);
        display.print(message);
        display.updateWindow(message_box_1[0], message_box_1[1], message_box_1[2], message_box_1[3], true);
    }
}
