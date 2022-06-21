#include <Display.h>

extern float battery;
extern uint8_t selectedOption;
extern uint8_t lastClickType;
extern uint8_t menuAction;

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class  display(io, EPD_RSET, EPD_BUSY);

void displayWiFiIcon(bool);
void displayLogo();

// box_x, box_y, box_w, box_h
int16_t screen[4] = {0, 0, 249, display.height()};
int16_t main_screen[4] = {0, 30, 249, 92};
int16_t wifi_box[4] = {0, 0, 30, 22};
int16_t battery_box[4] = {225, 0, 24, 24};
int16_t logo_box[4] = {90, 0, 50, 22};
int16_t message_box_1[4] = {2, 60, 246, 22};
int16_t message_box_2[4] = {2, 80, 246, 22};
int16_t char_box[4] = {2, 80, 11, 22};

int16_t option_box_0[4] = {2, 40, 246, 22};
int16_t option_box_1[4] = {2, 60, 246, 22};
int16_t option_box_2[4] = {2, 80, 246, 22};
int16_t option_box_3[4] = {2, 100, 246, 22};
int16_t *boxes[4] = {
    option_box_0,
    option_box_1,
    option_box_2,
    option_box_3};

unsigned long timeoutStart;

void update_area(int16_t box[4])
{
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void clear_area(int16_t box[4])
{
    display.fillRect(box[0], box[1], box[2], box[3], GxEPD_WHITE);
    update_area(box);
}

void Display::setupDisplay()
{
    display.init();
    display.setRotation(3); // Sets rotation to landscape, where the top of the display == side that the buttons are on.

    display.fillScreen(GxEPD_WHITE);
    display.setTextColor(GxEPD_BLACK);
    display.update();
    clear_area(screen);
    displayLogo();
    displayWiFiIcon(false);
    // displayBattery(battery);
}

void Display::update_display() {
    display.update();
}

void bitmapBox(const uint8_t bitmap[], int16_t box[])
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
    clear_area(wifi_box);
    if (connected) // set icon on e-paper display to WiFiConnectedIcon.
    {
        bitmapBox(WiFiConnectedIcon, wifi_box);
    }
    else // set icon on e-paper display to WiFiDisconnectedIcon.
    {
        bitmapBox(WiFiDisconnectedIcon, wifi_box);
    }
}

void Display::displayBattery(float percent)
{
    if (percent < 0) {
        bitmapBox(BatteryCharging, battery_box);
    }
    if (percent < 20) {
        bitmapBox(Battery0, battery_box);
    }
    else if (percent < 50)
    {
        bitmapBox(Battery30, battery_box);
    }
    else if (percent < 80)
    {
        bitmapBox(Battery60, battery_box);
    }
    else {
        bitmapBox(Battery100, battery_box);
    }
}

void outline(int16_t box[])
{
    display.drawRect(box[0]+BORDER, box[1]+BORDER, box[2]-BORDER, box[3]-BORDER, GxEPD_BLACK);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void displayText(const char *message, int16_t box[4], bool draw_box)
{
    clear_area(box);
    if (draw_box)
        outline(box);
    display.setCursor(box[0] + PADDING, box[1] + VOFFSET);
    display.print(message);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void Display::displayMessage(const char *message, uint8_t line, bool draw_box)
{
    display.setTextColor(GxEPD_BLACK);
    display.setFont(&FreeMonoBold9pt7b);
    if (line == 1)
        displayText(message, message_box_1, draw_box);
    else
        displayText(message, message_box_2, draw_box);

    Serial.println(message);
}

void Display::progress(uint8_t done, uint8_t total)
{
    char_box[0] = round(20 / float(total) * float(done)) * 11; // Set horzontalposition of the character
    displayText("=", char_box, false);
}

void buttonHandler(Button2 &btn)
{
    switch (btn.getClickType())
    {
    case SINGLE_CLICK:
        lastClickType = SINGLE_CLICK;
        Serial.println("Single click");
        break;

    case DOUBLE_CLICK:
        lastClickType = DOUBLE_CLICK;
        Serial.println("Double click");
        break;

    case TRIPLE_CLICK:
        lastClickType = TRIPLE_CLICK;
        Serial.println("Triple click");
        break;

    case LONG_CLICK:
        lastClickType = LONG_CLICK;
        Serial.println("Long click");
        break;
    }
}

void Display::clearScreen()
{
    clear_area(main_screen);
}

void displayOption(const char *text, int16_t box[4], bool selected)
{
    uint16_t background = GxEPD_WHITE;
    uint16_t textColour = GxEPD_BLACK;

    if (selected)
    {
        background = GxEPD_BLACK;
        textColour = GxEPD_WHITE;
    }
    display.fillRect(box[0], box[1], box[2], box[3], background);
    display.setTextColor(textColour);

    display.setCursor(box[0] + PADDING, box[1] + VOFFSET);
    display.print(text);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void Display::menu(const char* options[], uint8_t size, uint8_t selected)
{
    lastClickType = 0;

    Button2 button;
    button.begin(BUTTONPIN);
    button.setLongClickTime(1000);
    button.setClickHandler(buttonHandler);
    button.setDoubleClickHandler(buttonHandler);
    button.setTripleClickHandler(buttonHandler);
    button.setLongClickHandler(buttonHandler);

    timeoutStart = millis();

    display.setFont(&FreeMonoBold9pt7b);

    for (uint8_t i=0; i<size;  i++) 
        displayOption(options[i], boxes[i], (i == selected));

    // Wait up to 30s for user input
    while (millis() - timeoutStart < 30000) {
        button.loop();

        if (lastClickType == SINGLE_CLICK) {
            displayOption(options[selectedOption], boxes[selectedOption], false);
            selectedOption = (selectedOption + 1) % size;
            displayOption(options[selectedOption], boxes[selectedOption], true);
            lastClickType = 0;
        }

        if (lastClickType == LONG_CLICK) {
            menuAction = selectedOption;
            break;
        }
    }
}

void Display::proceed(const char *message1, const char *message2, uint16_t timeout)
{
    lastClickType = 0;

    Button2 button;
    button.begin(BUTTONPIN);
    button.setLongClickTime(1000);
    button.setClickHandler(buttonHandler);
    button.setDoubleClickHandler(buttonHandler);
    button.setTripleClickHandler(buttonHandler);
    button.setLongClickHandler(buttonHandler);

    timeoutStart = millis();

    displayMessage(message1, 1);
    displayMessage(message2, 2);

    // Wait up to timeout s for user input
    while (millis() - timeoutStart < timeout * 1000)
    {
        button.loop();
        if (lastClickType > 0) {
            clearScreen();
            lastClickType = 0;
            return;
        }
    }


    displayMessage("Timed out", 1);
    displayMessage("Aborting...", 2);
    delay(2000);
    ESP.restart();
}
