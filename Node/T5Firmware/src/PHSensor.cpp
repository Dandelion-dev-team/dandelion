#include <PHSensor.h>

#define PH_PIN 32
float voltage,phValue,phTemperature = 25;
DFRobot_PH ph;

void PHSensor::initialise()
{
    EEPROM.begin(32); // needed to permit storage of calibration value in eeprom
    ph.begin();  
    Serial.println("defo being initialised");
}

float PHSensor::getReadings()
{
    static unsigned long timepoint = millis();
    if(millis()-timepoint>1000U){                  //time interval: 1s
        timepoint = millis();
        //temperature = readTemperature();         // read your temperature sensor to execute temperature compensation
        voltage = analogRead(PH_PIN)/1024.0*5000;  // read the voltage
        phValue = ph.readPH(voltage,phTemperature);  // convert voltage to pH with temperature compensation
        Serial.print("temperature:");
        Serial.print(phTemperature,1);
        Serial.print("^C  pH:");
        Serial.println(phValue,2);
        return phValue;
    }
    ph.calibration(voltage,phTemperature);           // calibration process by Serail CMD
}