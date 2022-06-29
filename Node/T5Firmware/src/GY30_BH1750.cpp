#include <GY30_BH1750.h>

void GY30_BH1750::initialise()
{
    initialisationSuccessful = begin();
    delay(1000);
}

void GY30_BH1750::getReadings()
{
    if (initialisationSuccessful) {
        cardOperation.log("Reading GY30 light sensor");
        readings["luminosity"] = readLightLevel();
    }
    else {
        cardOperation.log("GY30 light sensor not correctly initialised");
        readings["luminosity"] = INVALID;
    }
}