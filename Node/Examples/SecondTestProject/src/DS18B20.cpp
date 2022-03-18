#include <DS18B20.h>

const int pinUsedBySensor = 14;
OneWire oneWire(pinUsedBySensor);
DallasTemperature dallasTemp(&oneWire);

void DS18B20::initialise()
{
    dallasTemp.begin();
}

float DS18B20::getReadings()
{
    dallasTemp.requestTemperatures();
    return dallasTemp.getTempCByIndex(0);
}