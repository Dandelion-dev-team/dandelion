#include <Utils.h>

extern Preferences preferences;
extern Display ui;

using std::cin;
using std::cout;
using std::endl;
using std::string;

void Utils::initialise_pins()
{
    digitalWrite(SET_1, LOW);
    digitalWrite(SET_2, LOW);
    digitalWrite(SET_3, LOW);
}

unsigned long Utils::select(uint8_t pin)
{
    initialise_pins();
    digitalWrite(pin, HIGH);

    return millis();
}

char *Utils::to_string(float num)
{
    std::stringstream sstream;

    sstream << num;
    string num_str = sstream.str();
    // auto *ptr = sstream.str().c_str(); // RESULTS in dangling pointer
    if (num_str.empty())
        return INVALID_STR;
    else
        return (char *)num_str.c_str();

}

char *Utils::to_string(int num)
{
    float floatValue = num;
    return to_string(floatValue);
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

void Utils::reset_adc()
{
    esp_adc_cal_characteristics_t adc_chars;
    esp_adc_cal_value_t val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_1,
                                                            (adc_atten_t)ADC_ATTEN_DB_2_5,
                                                            (adc_bits_width_t)ADC_WIDTH_BIT_12,
                                                            1100, &adc_chars);

    val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_2,
                                        (adc_atten_t)ADC_ATTEN_DB_2_5,
                                        (adc_bits_width_t)ADC_WIDTH_BIT_12,
                                        1100, &adc_chars);
    // Characterize ADC at particular atten
    // esp_adc_cal_characteristics_t *adc_chars = calloc(1, sizeof(esp_adc_cal_characteristics_t));
    // esp_adc_cal_value_t val_type = esp_adc_cal_characterize(unit, atten, ADC_WIDTH_BIT_12, DEFAULT_VREF, adc_chars);
    // Check type of calibration value used to characterize ADC
    Serial.print("ADC Vref type: ");
    if (val_type == ESP_ADC_CAL_VAL_EFUSE_VREF)
    {
        Serial.println("eFuse Vref");
    }
    else if (val_type == ESP_ADC_CAL_VAL_EFUSE_TP)
    {
        Serial.println("Two Point");
    }
    else
    {
        Serial.println("Default");
    }

    uint8_t block[32];
    memcpy(block, (void *)EFUSE_BLK0_RDATA0_REG, sizeof(block));
    Serial.println((char *)block);
}
    
// float Utils::get_battery_percent()
// {
//     // ToDo: This needs a lot of checking...
//     // Set ADC characteristics required to measure battery level on pin 14 - EXTERNALLY!!
//     float readings = 0;
//     Serial.print("Setting ADC charactersitics");
//     esp_adc_cal_characteristics_t adc_chars;
//     esp_adc_cal_value_t val_type = esp_adc_cal_characterize((adc_unit_t)ADC_UNIT_1,
//                                                             (adc_atten_t)ADC_ATTEN_DB_2_5,
//                                                             (adc_bits_width_t)ADC_WIDTH_BIT_12,
//                                                             1100, &adc_chars);
//     pinMode(14, OUTPUT);

//     digitalWrite(14, HIGH);
//     delay(1);
//     for (int i = 0; i < 10; i++)
//     {
//         readings += (float)analogRead(34);
//         delay(50);
//     }
//     // float measurement = (float)analogRead(34);

//     digitalWrite(14, LOW);
//     reset_adc();

//     // float battery_voltage = 3.3 / 1000 * mv;
//     float battery_voltage = readings / 10 / 4095.0 * 7.26;
//     float battery_percent = map(battery_voltage, 3.0, 4.0, 0, 100);

//     Serial.print("Battery voltage: ");
//     Serial.println(battery_voltage);
//     Serial.print("Battery percent: ");
//     Serial.println(battery_percent);

//     // return battery_percent;
//     return battery_voltage;
// }

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

void Utils::saveToPreferences(char *key, int value)
{
    preferences.begin("dandelion", false); // Use "dandelion" namespace
    preferences.putInt(key, value);
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

    preferences.begin("dandelion", true);

    if (preferences.isKey(key))
        value = preferences.getString(key);
    else
        value = "NOT SET";
    preferences.end();

    return value;
}

float Utils::getFromPreferences(char *key, float defaultValue)
{
    float value;

    preferences.begin("dandelion", true);
    if (preferences.isKey(key))
        value = preferences.getFloat(key);
    else
        value = defaultValue;

    preferences.end();

    Serial.print("Using ");
    Serial.print(key);
    Serial.print(" value: ");
    Serial.println(value);

    return value;
}

int Utils::getFromPreferences(char *key, int defaultValue)
{
    int value;

    preferences.begin("dandelion", true);
    if (preferences.isKey(key))
        value = preferences.getInt(key);
    else
        value = defaultValue;

    preferences.end();

    Serial.print("Using ");
    Serial.print(key);
    Serial.print(" value: ");
    Serial.println(value);

    return value;
}

void Utils::removeFromPreferences(char *key)
{
    preferences.begin("dandelion", false);
    preferences.remove(key);
    preferences.end();
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

float Utils::mean(std::vector<float> values)
{
    return std::accumulate(values.begin(), values.end(), 0.0) / values.size();
}

float Utils::mean(std::vector<int> values)
{
    std::vector<float> floatValues(values.begin(), values.end());
    return mean(floatValues);
}

float Utils::variance(std::vector<float> values)
{
    float meanValue = mean(values);
    float sumSquares = 0;

    for (uint8_t i = 0; i < values.size(); i++)
    {
        float deviation = values[i] - meanValue;
        sumSquares += (deviation * deviation);
    }

    return sumSquares / float(values.size());
}

float Utils::variance(std::vector<int> values)
{
    std::vector<float> floatValues(values.begin(), values.end());
    return variance(floatValues);
}

std::tuple<float, float> Utils::analogReadStats(uint8_t pin)
{
    std::vector<int> values;

    // every 40 milliseconds, read the analog value from the ADC until SCOUNT readings have been made
    for (uint8_t i = 0; i < SCOUNT; i++)
    {
        values.push_back(analogRead(pin));
        pinMode(pin, INPUT_PULLDOWN);
        delay(40);
    }

    return std::make_tuple(
        std::accumulate(values.begin(), values.end(), 0.0) / values.size(),
        variance(values));
}

float Utils::roundf(float value, uint8_t prec)
{
    float pow_10 = pow(10.0f, (float)prec);
    return round(value * pow_10) / pow_10;
}

void Utils::polyRegression(const std::vector<float> &x, const std::vector<float> &y, std::vector<float> &coeffs, uint8_t scale)
{
    Serial.print("X: ");
    Serial.print(x[0]);
    Serial.print(", ");
    Serial.print(x[1]);
    Serial.print(", ");
    Serial.println(x[2]);
    Serial.print("Y: ");
    Serial.print(y[0]);
    Serial.print(", ");
    Serial.print(y[1]);
    Serial.print(", ");
    Serial.println(y[2]);
    Serial.print("Scale: ");
    Serial.println(scale);

    int n = x.size();
    std::vector<float> xscaled;
    for (uint8_t i = 0; i < x.size(); i++)
    {
        xscaled.push_back(x[i] / scale);
    }

    double xm = 0;
    double ym = 0;
    double x2m = 0;
    double x3m = 0;
    double x4m = 0;
    double xym = 0;
    double x2ym = 0;

    for (uint8_t i = 0; i < n; i++)
    {
        double x2_temp = xscaled[i] * xscaled[i];

        xm = xm + xscaled[i] / n;
        ym = ym + y[i] / n;
        x2m = x2m + x2_temp / n;
        x3m = x3m + x2_temp * xscaled[i] / n;
        x4m = x4m + x2_temp * x2_temp / n;
        xym = xym + xscaled[i] * y[i] / n;
        x2ym = x2ym + x2_temp * y[i] / n;
    }

    double aug_matrix[3][4] = {
        {1, xm, x2m, ym},
        {xm, x2m, x3m, xym},
        {x2m, x3m, x4m, x2ym}};

    // R2 = R2 - xm * R1
    // R3 = R3 - x2m * R1

    for (uint8_t i = 0; i < 4; i++)
    {
        aug_matrix[1][i] = aug_matrix[1][i] - aug_matrix[0][i] * xm;
        aug_matrix[2][i] = aug_matrix[2][i] - aug_matrix[0][i] * x2m;
    }

    // R3 = R3 - R2 * R3[2] / R2[2]

    double factor = aug_matrix[2][1] / aug_matrix[1][1];

    for (uint8_t i = 0; i < 4; i++)
    {
        aug_matrix[2][i] = aug_matrix[2][i] - aug_matrix[1][i] * factor;
    }

    coeffs[2] = aug_matrix[2][3] / aug_matrix[2][2];
    coeffs[1] = (aug_matrix[1][3] - aug_matrix[1][2] * coeffs[2]) / aug_matrix[1][1];
    coeffs[0] = (aug_matrix[0][3] - aug_matrix[0][2] * coeffs[2] - aug_matrix[0][1] * coeffs[1]);

    coeffs[2] = coeffs[2] / scale / scale;
    coeffs[1] = coeffs[1] / scale;

    Serial.print("C0: ");
    Serial.println(coeffs[0], 4);
    Serial.print("C1: ");
    Serial.println(coeffs[1], 4);
    Serial.print("C2: ");
    Serial.println(coeffs[2], 4);
}

// Next three functions from https://github.com/chegewara/esp32-AWSFreeRTOS-wifi-provisioning-demo/blob/master/lib/third_party/mcu_vendor/espressif/esp-idf/components/esp_adc_cal/esp_adc_cal.c
// Required for reading VREF value from eFuse
// static bool check_efuse_vref()
// {
//     // Check if Vref is burned in eFuse
//     return (REG_GET_FIELD(VREF_REG, EFUSE_RD_ADC_VREF) != 0) ? true : false;
// }

// static inline int decode_bits(uint32_t bits, uint32_t mask, bool is_twos_compl)
// {
//     int ret;
//     if (bits & (~(mask >> 1) & mask))
//     { // Check sign bit (MSB of mask)
//         // Negative
//         if (is_twos_compl)
//         {
//             ret = -(((~bits) + 1) & (mask >> 1)); // 2's complement
//         }
//         else
//         {
//             ret = -(bits & (mask >> 1)); // Sign-magnitude
//         }
//     }
//     else
//     {
//         // Positive
//         ret = bits & (mask >> 1);
//     }
//     return ret;
// }

// uint32_t Utils::read_efuse_vref()
// {
//     if (check_efuse_vref()) {
//         // eFuse stores deviation from ideal reference voltage
//         uint32_t ret = VREF_OFFSET; // Ideal vref
//         uint32_t bits = REG_GET_FIELD(VREF_REG, EFUSE_ADC_VREF);
//         ret += decode_bits(bits, VREF_MASK, VREF_FORMAT) * VREF_STEP_SIZE;
//         return ret; // ADC Vref in mV
//     }

//     return VREF_OFFSET;
// }