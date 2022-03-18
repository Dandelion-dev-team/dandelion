#include <Arduino.h>

//Required by any Adafruit sensor
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>

//TSL2591 library
#include <Adafruit_TSL2591.h>
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
int luminosity;

//BME280
#include <Adafruit_BME280.h>
#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;

//DS18B20
#include <OneWire.h>
#include <DallasTemperature.h>
const int ds18Pin = 14;
OneWire oneWire(ds18Pin);
DallasTemperature dallasTemp(&oneWire);

//TDS_Meter
#define TdsSensorPin 32 //T5 pin that the sensor is connected to
#define VREF 5.0      // analog reference voltage(Volt) of the ADC
#define SCOUNT  30           // sum of sample point
int analogBuffer[SCOUNT];    // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0,copyIndex = 0;
float averageVoltage = 0,tdsValue = 0,temperature = 25;
static unsigned long analogSampleTimepoint = millis();
void tdsReading();
int getMedianNum(int bArray[], int iFilterLen);
//end of TDS_Meter requirements.

void takeReadings();

void setup() 
{
  Serial.begin(115200);
  init();
}

void loop() 
{
  takeReadings();
  delay(2000);
}

void takeReadings()
{
  //TSL2591 readings
  Serial.println();
  int lux = tsl.getLuminosity(TSL2591_VISIBLE);
  Serial.print(F("Luminosity: "));
  Serial.println(lux, DEC);

  // //BME280 readings
  // Serial.print("Temperature = ");
  // Serial.print(bme.readTemperature());
  // Serial.println(" *C");

  // Serial.print("Pressure = ");
  // Serial.print(bme.readPressure() / 100.0F);
  // Serial.println(" hPa");

  // Serial.print("Approx. Altitude = ");
  // Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  // Serial.println(" m");

  // Serial.print("Humidity = ");
  // Serial.print(bme.readHumidity());
  // Serial.println(" %");
  // Serial.println();

  // //DS18 readings
  // dallasTemp.requestTemperatures();
  // Serial.print("Reading = ");
  // Serial.println(dallasTemp.getTempCByIndex(0));

  //TDS_Meter - in its own method as the code is so long.
  tdsReading();
  Serial.println("End of loop method");
}

void init()
{
  tsl.setGain(TSL2591_GAIN_MED); //tsl
  // bme.begin(0x76); //bme
  // dallasTemp.begin(); //ds18
  // pinMode(TdsSensorPin,INPUT); //TDS_meter
  // Serial.println("end of init() method");
}

void tdsReading()
  {
    if(millis()-analogSampleTimepoint > 40U)     //every 40 milliseconds,read the analog value from the ADC
    {
      analogSampleTimepoint = millis();
      analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);    //read the analog value and store into the buffer
      analogBufferIndex++;
      if(analogBufferIndex == SCOUNT) 
          analogBufferIndex = 0;
    }   
    static unsigned long printTimepoint = millis();
    if(millis()-printTimepoint > 800U)
    {
        printTimepoint = millis();
        for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
          analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
        averageVoltage = getMedianNum(analogBufferTemp, SCOUNT) * (float)VREF / 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
        float compensationCoefficient=1.0+0.02*(temperature-25.0);    //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
        float compensationVolatge=averageVoltage/compensationCoefficient;  //temperature compensation
        tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
        //Serial.print("voltage:");
        //Serial.print(averageVoltage,2);
        //Serial.print("V   ");
        Serial.print("TDS Value:");
        Serial.print(tdsValue,0);
        Serial.println("ppm");
    }
}

int getMedianNum(int bArray[], int iFilterLen) //for TDS sensor
  {
        int bTab[iFilterLen];
        for (byte i = 0; i<iFilterLen; i++)
        bTab[i] = bArray[i];
        int i, j, bTemp;
        for (j = 0; j < iFilterLen - 1; j++) 
        {
        for (i = 0; i < iFilterLen - j - 1; i++) 
            {
          if (bTab[i] > bTab[i + 1]) 
              {
          bTemp = bTab[i];
              bTab[i] = bTab[i + 1];
          bTab[i + 1] = bTemp;
          }
        }
        }
        if ((iFilterLen & 1) > 0)
      bTemp = bTab[(iFilterLen - 1) / 2];
        else
      bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
        return bTemp;
  }