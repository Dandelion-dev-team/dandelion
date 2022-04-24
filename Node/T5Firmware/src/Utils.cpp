#include <Utils.h>

void Utils::debug(String message, bool newline)
{
    /* This method checks the DEBUG setting and prints the message to the Serial monitor if true
    */
    if (DEBUG) {
        if (newline)
            Serial.println(message);
        else
            Serial.print(message);
    }
}

void Utils::leftPad(std::string &str, size_t paddedLength, const char ch = '.')
{
    int strSize = str.size();
    if (paddedLength > strSize)
    {
        str.insert(0, paddedLength - strSize, ch);
    }
}

void Utils::printHex(uint8_t *text, size_t size)
{
    for (int i = 0; i < size; i = i + 1)
    {
        if (text[i] < 16)
        {
            Serial.print("0");
        }
        Serial.print(text[i], HEX);
    }
}

uint8_t Utils::get_mode()
{
    switch (esp_sleep_get_wakeup_cause())
    {
    case 2:
        Serial.println("Wakeup caused by external signal using RTC_IO");
        return SENSORMODE;
    case 3:
        Serial.println("Wakeup caused by external signal using RTC_CNTL");
        return SENSORMODE;
    case 4:
        Serial.println("Wakeup caused by timer");
        return SENSORMODE;
    case 5:
        Serial.println("Wakeup caused by touchpad");
        return SENSORMODE;
    case 6:
        Serial.println("Wakeup caused by ULP program");
        return SENSORMODE;
    default:
        Serial.println("Wakeup was not caused by deep sleep, entering user interaction mode");
        return UIMODE;
    }
}

float Utils::get_battery_percent() {
    digitalWrite(14, HIGH);
    delay(1);
    float measurement = (float)analogRead(34);
    digitalWrite(14, LOW);

    float battery_voltage = (measurement / 4095.0) * 7.26;
    float battery_percent = map(battery_voltage, 2.55, 3.7, 0, 100);
    return battery_percent;
}
