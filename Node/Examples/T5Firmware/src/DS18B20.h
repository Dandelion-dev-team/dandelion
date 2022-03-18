#include <SensorModule.h>
#include <OneWire.h>
#include <DallasTemperature.h>

class DS18B20 : public SensorModule
{
public:
    void initialise();
    float getReadings();
};