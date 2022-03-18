#include <BME280.h>

#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;

enum Measurement { temperature, pressure, altitude, humidity };

void BME280::initialise()
{
    bme.begin(0x76);
}

float BME280::getReadings()
{
    //BME
    Serial.print("Temperature = ");
    Serial.print(bme.readTemperature());
    Serial.println(" *C");

    return 0;
}

// float BME280::getReadings(int num)
// {
//     float bme_reading;
    
//     switch(num)
//     {
//         case temperature:
//             bme_reading = bme.readTemperature();
//             return bme_reading;
//         case pressure:
//             bme_reading = bme.readPressure() / 100.F;
//             return bme_reading;
//         case altitude:
//             bme_reading = bme.readAltitude(SEALEVELPRESSURE_HPA);
//             return bme_reading;
//         case humidity:
//             bme_reading = bme.readHumidity();
//             return bme_reading;
//     }
// }