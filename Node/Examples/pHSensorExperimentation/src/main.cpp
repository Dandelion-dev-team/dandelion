// //This is the code Brian sent recently, whicb returns pH as NaN:
// #include <Arduino.h>
// #include "DFRobot_PH.h"
// #include <EEPROM.h>

// DFRobot_PH ph;
// #define ESPADC 4096.0   // the esp Analog Digital Convertion value
// #define ESPVOLTAGE 3300 // the esp voltage supply value
// #define PH_PIN 32       // the esp gpio data pin number
// float voltage, phValue, temperature = 25;

// void setup()
// {
//   Serial.begin(115200);
//   EEPROM.begin(32); // needed to permit storage of calibration value in eeprom
//   ph.begin();
// }

// void loop()
// {
//   static unsigned long timepoint = millis();
//   if (millis() - timepoint > 1000U) // time interval: 1s
//   {
//     timepoint = millis();
//     // voltage = rawPinValue / esp32ADC * esp32Vin
//     voltage = analogRead(PH_PIN) / ESPADC * ESPVOLTAGE; // read the voltage
//     Serial.print("voltage:");
//     Serial.println(voltage, 4);

//     // temperature = readTemperature();  // read your temperature sensor to execute temperature compensation
//     Serial.print("temperature:");
//     Serial.print(temperature, 1);
//     Serial.println("^C");

//     phValue = ph.readPH(voltage, temperature); // convert voltage to pH with temperature compensation
//     Serial.print("pH:");
//     Serial.println(phValue, 4);
//   }
//   ph.calibration(voltage, temperature); // calibration process by Serial CMD
// }

// float readTemperature()
// {
//   // add your code here to get the temperature from your temperature sensor
// }


// /*!
//  * @file DFRobot_PH_Test.h
//  * @brief This is the sample code for Gravity: Analog pH Sensor / Meter Kit V2, SKU:SEN0161-V2.
//  * @n In order to guarantee precision, a temperature sensor such as DS18B20 is needed, to execute automatic temperature compensation.
//  * @n You can send commands in the serial monitor to execute the calibration.
//  * @n Serial Commands:
//  * @n    enterph -> enter the calibration mode
//  * @n    calph   -> calibrate with the standard buffer solution, two buffer solutions(4.0 and 7.0) will be automaticlly recognized
//  * @n    exitph  -> save the calibrated parameters and exit from calibration mode
//  *
//  * @copyright   Copyright (c) 2010 DFRobot Co.Ltd (http://www.dfrobot.com)
//  * @license     The MIT License (MIT)
//  * @author [Jiawei Zhang](jiawei.zhang@dfrobot.com)
//  * @version  V1.0
//  * @date  2018-11-06
//  * @url https://github.com/DFRobot/DFRobot_PH
//  */

// //This is the code that seems to produce a viable reading:
#include "DFRobot_PH.h"
#include <EEPROM.h>

#define PH_PIN 32
float voltage,phValue,temperature = 25;
DFRobot_PH ph;

void setup()
{
    Serial.begin(115200);  
    ph.begin();
}

void loop()
{
    static unsigned long timepoint = millis();
    if(millis()-timepoint>1000U){                  //time interval: 1s
        timepoint = millis();
        //temperature = readTemperature();         // read your temperature sensor to execute temperature compensation
        voltage = analogRead(PH_PIN)/1024.0*5000;  // read the voltage
        phValue = ph.readPH(voltage,temperature);  // convert voltage to pH with temperature compensation
        Serial.print("temperature:");
        Serial.print(temperature,1);
        Serial.print("^C  pH:");
        Serial.println(phValue,2);
    }
    ph.calibration(voltage,temperature);           // calibration process by Serail CMD
}

float readTemperature()
{
  //add your code here to get the temperature from your temperature sensor
}
