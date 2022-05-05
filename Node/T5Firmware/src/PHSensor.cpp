#include <PHSensor.h>

DFRobot_ESP_PH ph;

void PHSensor::initialise(uint8_t datapin)
{
    cubeLevel = datapin;
    EEPROM.begin(32); // needed to permit storage of calibration value in eeprom
    ph.begin();
    initialisationSuccessful = true;
}

void PHSensor::getReadings()
{
    if (initialisationSuccessful) {
        // phValue = ph.readPH(voltage,phTemperature);  // temperature compensation requires substrate temperature from DS18B20

        readings["pH"] = analogRead(cubeLevel) / ESPADC * ESPVOLTAGE; // Return raw voltage for now & convert in post-processing

        // ph.calibration(voltage,phTemperature);           // calibration process by Serial CMD
    }
    else {
        readings["pH"] = INVALID;
    }
}