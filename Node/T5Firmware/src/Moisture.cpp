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
        moisture = analogRead(ANALOGUE1);
        readings["moisture"] = map(moisture, 1570, 910, 0, 100);
    }
    else {
        readings["moisture"] = INVALID;
    }
}