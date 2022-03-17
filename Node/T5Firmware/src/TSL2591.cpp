#include <TSL2591.h>

Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
float luminosity;

void TSL2591::initialise()
{
    tsl.begin();
    tsl.setGain(TSL2591_GAIN_MED);
    tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
}

float TSL2591::getReadings()
{
    luminosity = tsl.getLuminosity(TSL2591_VISIBLE);
    return luminosity;
}