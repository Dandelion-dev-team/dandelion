#include <SHTC3.h>

void SHTC3::initialise()
{
    initialisationSuccessful = init();
}

void SHTC3::getReadings()
{
    if (initialisationSuccessful) {
        setAccuracy(SHTSensor::SHT_ACCURACY_MEDIUM); // only supported by SHT3x
        if (readSample())
        {
            cardOperation.log("Reading SHTC3 temperature and humidity");
            readings["humidity"] = getHumidity();
            readings["air temperature"] = getTemperature();
        }
        else
        {
            cardOperation.log("SHTC3 temperature and humidity sensor not correctly initialised");
            readings["humidity"] = INVALID;
            readings["air temperature"] = INVALID;
        }
    }
    else
    {
        cardOperation.log("SHTC3 temperature and humidity sensor not correctly initialised");
        readings["humidity"] = INVALID;
        readings["air temperature"] = INVALID;
    }
}