#include <PHSensor.h>

DFRobot_ESP_PH ph;

void PHSensor::initialise(uint8_t datapin)
{
    cubeLevel = datapin;
    EEPROM.begin(32); // needed to permit storage of calibration value in eeprom
    ph.begin();
    initialisationSuccessful = true;
}

void PHSensor::getReadings(float temperature)
{
    if (initialisationSuccessful) {
        
        float voltage = analogRead(cubeLevel) / ESPADC * ESPVOLTAGE;    // Return raw voltage for now & convert in post-processing
        readings["pH"] = ph.readPH(voltage, temperature);               // convert voltage to pH with temperature compensation

        // Apply calibration here. This is a placeholder.
        float slope = -0.7;
        float offset = 14.65;
        readings["pH"] = (readings["pH"] * slope) + offset;
        
        // ph.calibration(voltage,phTemperature);           // calibration process by Serial CMD
    }
    else {
        readings["pH"] = INVALID;
    }
}