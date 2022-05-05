#include <SHTC3.h>

// SHTSensor shtc3(SHTSensor::SHTC3);

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
            readings["humidity"] = getHumidity();
            readings["air temperature"] = getTemperature();
        }
        else
        {
            readings["humidity"] = INVALID;
            readings["air temperature"] = INVALID;
        }
    }
    else
    {
        readings["humidity"] = INVALID;
        readings["air temperature"] = INVALID;
    }
}