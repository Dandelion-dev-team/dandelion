#include <Display.h>

extern float battery;
extern uint8_t selectedOption;
extern uint8_t lastClickType;
extern uint8_t menuAction;
extern Utils utils;
extern char messageBuffer[256];

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
int16_t char_box[4] = {2, 80, 11, 22};

int16_t digit_0[4] = {2, 60, 30, 30};
int16_t digit_1[4] = {34, 60, 30, 30};
int16_t digit_2[4] = {66, 60, 30, 30};
int16_t digit_3[4] = {98, 60, 30, 30};
int16_t save_box[4] = {150, 60, 60, 30};
int16_t *digits[5] = {
    digit_0,
    digit_1,
    digit_2,
    digit_3,
    save_box
};

unsigned long timeoutStart;

void update_area(int16_t box[4])
{
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void clearArea(int16_t box[4])
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
    clearArea(screen);
    displayLogo();
    displayWiFiIcon(false);
    // displayBattery(battery);
}

void Display::update_display() {
    display.update();
}

void bitmapBox(const uint8_t bitmap[], int16_t box[])
{
    clearArea(box);
    display.drawBitmap(box[0], box[1], bitmap, box[2], box[3], GxEPD_BLACK);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void Display::displayLogo()
{
    bitmapBox(DandelionLogo, logo_box);
}

void Display::displayWiFiIcon(bool connected)
{
    clearArea(wifi_box);
    if (connected)
    {
        bitmapBox(WiFiConnectedIcon, wifi_box);
    }
    else
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

void Display::displayText(const char *message, int16_t box[4], bool draw_box, bool selected, bool largePad, const GFXfont *font)
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
    display.setFont(font);

    if (draw_box)
        outline(box);
    if (largePad)
        display.setCursor(box[0] + LARGE_PADDING, box[1] + LARGE_VOFFSET);
    else
        display.setCursor(box[0] + PADDING, box[1] + VOFFSET);
    display.print(message);
    display.updateWindow(box[0], box[1], box[2], box[3], true);
}

void buttonHandler(Button2 &btn)
{
    switch (btn.getClickType())
    {
    case SINGLE_CLICK:
        lastClickType = SINGLE_CLICK;
        break;

    case DOUBLE_CLICK:
        lastClickType = DOUBLE_CLICK;
        break;

    case TRIPLE_CLICK:
        lastClickType = TRIPLE_CLICK;
        break;

    case LONG_CLICK:
        lastClickType = LONG_CLICK;
        break;
    }
}

void Display::clearScreen()
{
    clearArea(main_screen);
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

    for (uint8_t i=0; i<size;  i++)
        displayText(options[i], boxes[i], false, (i == selected));

    // Wait up to 30s for user input
    while (millis() - timeoutStart < 30000) {
        button.loop();

        if (lastClickType == SINGLE_CLICK) {
            displayText(options[selectedOption], boxes[selectedOption], false, false);
            selectedOption = (selectedOption + 1) % size;
            displayText(options[selectedOption], boxes[selectedOption], false, true);
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

    displayText(message1, boxes[1]);
    displayText(message2, boxes[2]);

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

    displayText("Timed out", boxes[1]);
    displayText("Aborting...", boxes[2]);

    delay(2000);
    ESP.restart();
}

void Display::numericOptions(uint8_t selected)
{
    messageBuffer[1] = '\0';
    char_box[1] = 100;
    char_box[2] = 22;

    displayText("0 1 2 3 4 5 6 7 8 9", boxes[3]);

    char_box[0] = 2 + selected * 22;
    messageBuffer[0] = 48 + selected;
    displayText(messageBuffer, char_box, false, true);
}

int16_t Display::numericInput(const char *message, uint16_t timeout, uint8_t selectedDigit)
{
    lastClickType = 0;

    uint8_t values[5] = {0, 0, 0, 0, 0};
    bool settingDigit = false;
    uint8_t currentOption = 0, currentDigit = selectedDigit;
    char singleChar[2];
    singleChar[1] = '\0';

    Button2 button;
    button.begin(BUTTONPIN);
    button.setLongClickTime(1000);
    button.setClickHandler(buttonHandler);
    button.setDoubleClickHandler(buttonHandler);
    button.setTripleClickHandler(buttonHandler);
    button.setLongClickHandler(buttonHandler);

    timeoutStart = millis();

    displayText(message, boxes[0]);

    for (uint8_t i = 0; i < 5; i++)
    {
        if (i <= 3) {
            singleChar[0] = values[i] + 48;
            displayText(singleChar, digits[i], true, (selectedDigit == i), true, &FreeMonoBold12pt7b);
        }
        else
            displayText("Save", digits[i], true, (selectedDigit == i), true);
    }

    // Wait up to timeout s for user input
    while (millis() - timeoutStart < timeout * 1000)
    {
        button.loop();

        if (lastClickType == SINGLE_CLICK)
        {
            if (settingDigit) {
                currentOption = (currentOption + 1) % 10;
                numericOptions(currentOption);
            }
            else {
                if (currentDigit <= 3) {
                    singleChar[0] = values[currentDigit] + 48;
                    displayText(singleChar, digits[currentDigit], true, false, true, &FreeMonoBold12pt7b);
                }
                else
                    displayText("Save", digits[currentDigit], true, false, true);

                currentDigit = (currentDigit + 1) % 5;
                if (currentDigit <= 3) {
                    singleChar[0] = values[currentDigit] + 48;
                    displayText(singleChar, digits[currentDigit], true, true, true, &FreeMonoBold12pt7b);
                }
                else
                    displayText("Save", digits[currentDigit], true, true, true);
            }
        }

        if (lastClickType == LONG_CLICK)
        {
            if (settingDigit) {
                values[currentDigit] = currentOption;
                singleChar[0] = currentOption + 48;
                displayText(singleChar, digits[currentDigit], true, true, true, &FreeMonoBold12pt7b);
                clearArea(message_box_3);
                settingDigit = false;
            }
            else {
                if (currentDigit <= 3) {
                    numericOptions(values[currentDigit]);
                    currentOption = values[currentDigit];
                    settingDigit = true;
                }
                else {
                    return values[0] * 1000 + values[1] * 100 + values[2] * 10 + values[3];
                }
            }
        }
        lastClickType = 0;
    }
}