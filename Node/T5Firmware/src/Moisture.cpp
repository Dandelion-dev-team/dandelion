#include <Moisture.h>

void Moisture::initialise(uint8_t datapin)
{
    cubeLevel = datapin;
    initialisationSuccessful = true;
}

void Moisture::getReadings()
{
    float moisture;

    if (initialisationSuccessful)
    {
        moisture = analogRead(cubeLevel);
        pinMode(cubeLevel, INPUT_PULLDOWN); // analogueRead() disables the internal pulldown. This reinstates it ready for next time
        Serial.print("Pin ");
        Serial.print(cubeLevel);
        Serial.print(", Moisture: ");
        Serial.println(moisture);

        /* Readings appear to be different on each level
         * Needs to be tested with several sensor sets
         */
        if (moisture < 3550)
            moisture = 3550;

        readings["moisture"] = map(moisture, 4095, 3550, 0, 100);
        Serial.print("Moisture %: ");
        Serial.println(readings["moisture"]);
    }
    else {
        readings["moisture"] = INVALID;
    }
}