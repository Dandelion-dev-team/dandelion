#include <DS18B20Group.h>

extern char messageBuffer[256];
extern Utils utils;
extern MicroSDCardOperations cardOperation;
extern Display ui;

OneWire onewire(DATA1);

void DS18B20Group::initialise()
{
    DallasTemperature dallas(&onewire);
    onewire.begin(DATA1);
    delay(200);
    dallas.begin();
    delay(200);
    dallas.begin(); // Call twice to get the correct value for device count
    delay(200);

    for (uint8_t i = 0; i < 3; i++) {
        sensors[i] = *(new GenericSensor);
    }

    uint8_t probes = dallas.getDS18Count();

    strcpy(messageBuffer, "Found ");
    strcat(messageBuffer, utils.to_string(probes));
    strcat(messageBuffer, " DS18B20 probes");
    cardOperation.log(messageBuffer);

    initialisationSuccessful = true;
    if (probes == 0)
        initialisationSuccessful = false;

    delay(1000);
}

void DS18B20Group::getReadings()
{
    DallasTemperature dallas(&onewire);

    uint8_t sttseq, stmseq, stbseq;

    if (initialisationSuccessful)
    {
        cardOperation.log("Reading DB18B20 temperature probes");
        for (uint8_t i = 0; i < 3; i++)
        {
            dallas.requestTemperatures();
            if (dallas.getTempCByIndex(0) != 85 and
                dallas.getTempCByIndex(1) != 85 and
                dallas.getTempCByIndex(2) != 85)
                break;
            delay(500);
        }

        // The default ordering assumes that the order in which the temperature probes are
        // recognised is top, middle, bottom. However, this is not necessarily
        // always the case. The actual order needs to be set locally via a process similar to calibration

        sttseq = utils.getFromPreferences("sttseq", STTSEQ);
        stmseq = utils.getFromPreferences("stmseq", STMSEQ);
        stbseq = utils.getFromPreferences("stbseq", STBSEQ);

        sensors[TOP].readings["substrate temperature"] = dallas.getTempCByIndex(sttseq);
        sensors[MIDDLE].readings["substrate temperature"] = dallas.getTempCByIndex(stmseq);
        sensors[BOTTOM].readings["substrate temperature"] = dallas.getTempCByIndex(stbseq);

        for (uint8_t level = 0; level < 3; level++)
        {
            if (sensors[level].readings["substrate temperature"] == 85)
            {
                sensors[level].readings["substrate temperature"] = INVALID;
                cardOperation.log("Invalid temperature reading(85) - ", LEVELNAMES[level]);
            }
            if (sensors[level].readings["substrate temperature"] == -127)
            {
                sensors[level].readings["substrate temperature"] = INVALID;
                cardOperation.log("DS18B20temperature probe not found - ", LEVELNAMES[level]);
            }
        }
    }
    else {
        for (uint8_t i = 0; i < 3; i++)
            sensors[i].readings["substrate temperature"] = INVALID;
    }
}

uint8_t identify(DallasTemperature dallas, bool identified[3], unsigned long baseline)
{
    unsigned long timeoutStart = millis();
    for (uint8_t i=0; i<3; i++) {
        Serial.print(identified[i]);
        Serial.print(", ");
    }
    Serial.println();
    while (millis() - timeoutStart < 60000)
    {
        dallas.requestTemperatures();
        for (uint8_t i = 0; i < 3; i++)
        {
            if (identified[i])
                continue;

            Serial.print(i);
            Serial.print(": ");
            Serial.print(dallas.getTempCByIndex(i));
            Serial.print("   ");

            if (dallas.getTempCByIndex(i) > baseline + 5)
                return i;
        }
        Serial.println();

        delay(1000);
    }

    return TIMEOUT;
}

void DS18B20Group::calibrate()
{
    ui.displayText("Finding temp probes", ui.boxes[1]);

    DallasTemperature dallas(&onewire);
    float temperatureReading;
    float baseline = 0;
    uint8_t count = 0;
    unsigned long timeoutStart;
    uint8_t sttseq, stmseq, stbseq, hotProbe;
    bool identified[3] = {false, false, false};

    for (uint8_t i = 0; i < 3; i++)
    {
        dallas.requestTemperatures();
        if (dallas.getTempCByIndex(0) != 85 and
            dallas.getTempCByIndex(1) != 85 and
            dallas.getTempCByIndex(2) != 85)
            break;
        delay(500);
    }

    for (uint8_t i=0; i<3; i++) {
        temperatureReading = dallas.getTempCByIndex(i);
        if (temperatureReading != -127 and temperatureReading != 85) {
            count += 1;
            baseline += temperatureReading;
        }
    }

    if (count > 0) {
        strcpy(messageBuffer, utils.to_string(count));
        strcat(messageBuffer, " probes found");
        ui.displayText(messageBuffer, ui.boxes[2]);
        delay(2000);
        baseline /= count;
    }
    else {
        ui.displayText("No probes found", ui.boxes[2], true);
        delay(2000);
        return;
    }

    ui.displayText("Hold top probe...", ui.boxes[2]);
    timeoutStart = millis();
    hotProbe = identify(dallas, identified, baseline);
    identified[hotProbe] = true;
    Serial.print("Top hotProbe is ");
    Serial.println(hotProbe);
    if (hotProbe == TIMEOUT) {
        ui.displayText("No top probe!", ui.boxes[2], true);
        utils.removeFromPreferences("sttseq");
    }
    else
    {
        ui.displayText("Identified!", ui.boxes[2]);
        utils.saveToPreferences("sttseq", hotProbe);
    }
    delay(2000);
    
    ui.displayText("Hold middle probe...", ui.boxes[2]);
    timeoutStart = millis();
    hotProbe = identify(dallas, identified, baseline);
    identified[hotProbe] = true;
    Serial.print("Middle hotProbe is ");
    Serial.println(hotProbe);
    if (hotProbe == TIMEOUT) {
        ui.displayText("No middle probe!", ui.boxes[2], true);
        utils.removeFromPreferences("stmseq");
    }
    else
    {
    ui.displayText("Identified!", ui.boxes[2]);
    utils.saveToPreferences("stmseq", hotProbe);
    }
    delay(2000);

    ui.displayText("Hold bottom probe...", ui.boxes[2]);
    timeoutStart = millis();
    hotProbe = identify(dallas, identified, baseline);
    identified[hotProbe] = true;
    Serial.print("Bottom hotProbe is ");
    Serial.println(hotProbe);
    if (hotProbe == TIMEOUT) {
        ui.displayText("No bottom probe!", ui.boxes[2], true);
        utils.removeFromPreferences("stbseq");
    }
    else
    {
        ui.displayText("Identified!", ui.boxes[2]);
        utils.saveToPreferences("stbseq", hotProbe);
    }

    ui.displayText("Finished", ui.boxes[1]);
    ui.displayText("Rebooting...", ui.boxes[2]);
    ESP.restart();
}
