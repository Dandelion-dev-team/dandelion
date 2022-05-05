#include <Utils.h>

<<<<<<< Updated upstream
=======
extern Preferences preferences;

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

int Utils::getMedianNum(int bArray[], int iFilterLen)
{
    int bTab[iFilterLen];
    for (byte i = 0; i < iFilterLen; i++)
        bTab[i] = bArray[i];
    int i, j, bTemp;
    for (j = 0; j < iFilterLen - 1; j++)
    {
        for (i = 0; i < iFilterLen - j - 1; i++)
        {
            if (bTab[i] > bTab[i + 1])
            {
                bTemp = bTab[i];
                bTab[i] = bTab[i + 1];
                bTab[i + 1] = bTemp;
            }
        }
    }
    if ((iFilterLen & 1) > 0)
        bTemp = bTab[(iFilterLen - 1) / 2];
    else
        bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
    return bTemp;
}

String Utils::getSystemTime() 
{
    struct timeval tv;
    char timestamp[20];
    time_t nowtime;
    struct tm *nowtm;

    gettimeofday(&tv, NULL);
    nowtime = tv.tv_sec;
    nowtm = localtime(&nowtime);
    strftime(timestamp, sizeof timestamp, "%Y-%m-%d %H:%M:%S", nowtm);

    return timestamp;
}

time_t Utils::stringToDatetime(String str)
{
    tm tm_;
    int year, month, day, hour, minute, second;
    sscanf(str.c_str(), "%d-%d-%d %d:%d:%d", &year, &month, &day, &hour, &minute, &second);
    tm_.tm_year = year - 1900;
    tm_.tm_mon = month - 1;
    tm_.tm_mday = day;
    tm_.tm_hour = hour;
    tm_.tm_min = minute;
    tm_.tm_sec = second;
    tm_.tm_isdst = 0;

    time_t t_ = mktime(&tm_); // Has been lost 8 A time zone
    return t_;                // A second time
}

void Utils::setSystemTime(time_t timeVal)
{
    struct timeval timeToSet;
    timeToSet.tv_sec = timeVal;
    settimeofday(&timeToSet, NULL);
}

void Utils::saveToPreferences(char *key, String value)
{
    preferences.begin("dandelion", false); // Use "dandelion" namespace
    preferences.putString(key, value);
    preferences.end();
}

void Utils::saveToPreferences(char *key, float value)
{
    preferences.begin("dandelion", false);
    preferences.putFloat(key, value);
    preferences.end();
}

String Utils::getFromPreferences(char *key)
{
    String value;

    preferences.begin("dandelion", false);
    value = preferences.getString(key, "NOT SET");
    preferences.end();

    return value;
}

float Utils::getFromPreferences(char *key, float defaultValue)
{
    float value;

    preferences.begin("dandelion", false);
    value = preferences.getFloat(key, defaultValue);
    preferences.end();

    return value;
}

unsigned char h2int(char c)
{
    if (c >= '0' && c <= '9')
    {
        return ((unsigned char)c - '0');
    }
    if (c >= 'a' && c <= 'f')
    {
        return ((unsigned char)c - 'a' + 10);
    }
    if (c >= 'A' && c <= 'F')
    {
        return ((unsigned char)c - 'A' + 10);
    }
    return (0);
}

String Utils::urldecode(String str)
{
    String encodedString = "";
    char c;
    char code0;
    char code1;
    for (int i = 0; i < str.length(); i++)
    {
        c = str.charAt(i);
        if (c == '+')
        {
            encodedString += ' ';
        }
        else if (c == '%')
        {
            i++;
            code0 = str.charAt(i);
            i++;
            code1 = str.charAt(i);
            c = (h2int(code0) << 4) | h2int(code1);
            encodedString += c;
        }
        else
        {

            encodedString += c;
        }

        yield();
    }

    return encodedString;
}
>>>>>>> Stashed changes
