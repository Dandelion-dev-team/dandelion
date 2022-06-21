#include <PHGroup.h>

extern Utils utils;
extern Display ui;

uint8_t readingIndex = 0;
int rCount = 0;
uint8_t lookbackIndex = 0;
float readings[3][MAXLOOKBACK];
float gradientHistory[3][MAXLOOKBACK];

float getSlope(uint8_t level)
{
    if (level == TOP)
        return utils.getFromPreferences("phts", (float)PHTS);
    else if (level == MIDDLE)
        return utils.getFromPreferences("phms", (float)PHMS);
    else if (level == BOTTOM)
        return utils.getFromPreferences("phbs", (float)PHBS);
    else
        return 1;
}

float getOffset(uint8_t level)
{
    if (level == TOP)
        return utils.getFromPreferences("phto", (float)PHTO);
    else if (level == MIDDLE)
        return utils.getFromPreferences("phmo", (float)PHMO);
    else if (level == BOTTOM)
        return utils.getFromPreferences("phbo", (float)PHBO);
    else
        return 0;
}

float readPH(uint8_t level)
{
    float voltage = 0;
    float var = 0;

    std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[level]);
    voltage = voltage * (float)ESPVOLTAGE / ESPADC;

    // Apply calibration
    float thisPH = voltage * getSlope(level) + getOffset(level);

    Serial.print(LEVELNAMES[level]);
    Serial.print(",");
    Serial.print(voltage);
    Serial.print(",");
    Serial.print(thisPH);
    Serial.print(",");
    Serial.print(var);
    Serial.print(", ");

    return thisPH;
}



bool settled(float gradientHistory[3][MAXLOOKBACK], uint8_t index)
{
    float maxGradient = 0;
    uint8_t indexMinus1 = (index + MAXLOOKBACK - 1) % MAXLOOKBACK;
    uint8_t indexMinus2 = (index + MAXLOOKBACK - 2) % MAXLOOKBACK;

    for (uint8_t i = 0; i < 3; i++)
    {
        if (abs(gradientHistory[i][index]) > maxGradient)
            maxGradient = abs(gradientHistory[i][index]);
        if (abs(gradientHistory[i][indexMinus1]) > maxGradient)
            maxGradient = abs(gradientHistory[i][indexMinus1]);
        if (abs(gradientHistory[i][indexMinus2]) > maxGradient)
            maxGradient = abs(gradientHistory[i][indexMinus2]);
    }

    if (maxGradient < MAXGRADIENT)
        return true;

    return false;
}

void PHGroup::initialise()
{
    for (uint8_t i = 0; i < 3; i++)
        sensors[i] = *(new GenericSensor);

    initialisationSuccessful = true;
}

void readUntilSettled()
{
    float voltage = 0;
    float var = 0;

    rCount = 0;

    while (rCount <= MAXLOOKBACK or !settled(gradientHistory, lookbackIndex))
    {
        lookbackIndex = rCount % MAXLOOKBACK;

        for (uint8_t level = 0; level < 3; level++)
        {
            uint8_t firstIndex = (lookbackIndex + 1) % MAXLOOKBACK;

            std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[level]);
            voltage = voltage * (float)ESPVOLTAGE / ESPADC;

            Serial.print(LEVELNAMES[level]);
            Serial.print(",");
            Serial.print(voltage);
            Serial.print(",");
            Serial.print(var);
            Serial.print(", ");

            readings[level][lookbackIndex] = voltage;
            gradientHistory[level][lookbackIndex] = (readings[level][lookbackIndex] - readings[level][firstIndex]) / MAXLOOKBACK;
        }

        float maxGradient = abs(gradientHistory[TOP][lookbackIndex]);
        if (abs(gradientHistory[MIDDLE][lookbackIndex]) > maxGradient)
            maxGradient = abs(gradientHistory[MIDDLE][lookbackIndex]);
        if (abs(gradientHistory[BOTTOM][lookbackIndex]) > maxGradient)
            maxGradient = abs(gradientHistory[BOTTOM][lookbackIndex]);

        Serial.println(maxGradient);
        
        rCount += 1;
    }
}

void PHGroup::getReadings()
{
    if (initialisationSuccessful) {

        // Initialise arrays
        for (uint8_t level = 0; level < 3; level++)
        {
            for (uint8_t i = 0; i < MAXLOOKBACK; i++)
            {
                readings[level][i] = 0;
                gradientHistory[level][i] = 10;
            }
        }

        readUntilSettled();

        for (uint8_t level=0; level<3; level++)
            sensors[level].readings["pH"] = readings[level][lookbackIndex] * getSlope(level) + getOffset(level);
    }
    else {
        for (uint8_t level = 0; level < 3; level++)
            sensors[level].readings["pH"] = INVALID;
    }
}

std::tuple<float, float> calculateCalibrationValues(float ph4, float ph7)
{
    float slope = (7 - 4) / (ph7 - ph4);
    float offset = slope * (0 - ph4) + 4;

    return std::make_tuple(slope, offset);
}

void PHGroup::calibrate()
{
    float values[3][2] = {
        {1, 0},
        {1, 0},
        {1, 0}
    };

    float slope, offset;

    if (initialisationSuccessful)
    {
        // Initialise arrays
        for (uint8_t level = 0; level < 3; level++)
        {
            for (uint8_t i = 0; i < MAXLOOKBACK; i++)
            {
                readings[level][i] = 0;
                gradientHistory[level][i] = 10;
            }
        }

        ui.proceed("Place sensors in pH4", "then press the button", 300);
        ui.displayMessage("Calibrating");
        ui.displayMessage("Please wait...", 2);

        readUntilSettled();

        values[TOP][0] = readings[TOP][lookbackIndex];
        values[MIDDLE][0] = readings[MIDDLE][lookbackIndex];
        values[BOTTOM][0] = readings[BOTTOM][lookbackIndex];

        ui.clearScreen();
        ui.proceed("Place sensors in pH7", "then press the button", 300);
        ui.displayMessage("Calibrating");
        ui.displayMessage("Please wait...", 2);

        readUntilSettled();

        values[TOP][1] = readings[TOP][lookbackIndex];
        values[MIDDLE][1] = readings[MIDDLE][lookbackIndex];
        values[BOTTOM][1] = readings[BOTTOM][lookbackIndex];

        ui.clearScreen();
        ui.displayMessage("Calculating and saving", 1);
        delay(2000);

        std::tie(slope, offset) = calculateCalibrationValues(values[TOP][0], values[TOP][1]);
        utils.saveToPreferences("phts", slope);
        utils.saveToPreferences("phto", offset);

        std::tie(slope, offset) = calculateCalibrationValues(values[MIDDLE][0], values[MIDDLE][1]);
        utils.saveToPreferences("phms", slope);
        utils.saveToPreferences("phmo", offset);

        std::tie(slope, offset) = calculateCalibrationValues(values[BOTTOM][0], values[BOTTOM][1]);
        utils.saveToPreferences("phbs", slope);
        utils.saveToPreferences("phbo", offset);

        ui.proceed("Replace pH sensors", "then press the button", 300);
    }
    else
    {
        ui.displayMessage("Sensors not found!", 1, true);
        ui.displayMessage("Aborting...", 2);
        ESP.restart();
    }
}
