#include <GY30_BH1750.h>

void GY30_BH1750::initialise()
{
    initialisationSuccessful = begin();
}

void GY30_BH1750::getReadings()
{
    if (initialisationSuccessful) {
        readings["luminosity"] = readLightLevel();
    }
    else {
        readings["luminosity"] = INVALID;
    }
}