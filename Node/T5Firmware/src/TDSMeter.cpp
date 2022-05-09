#include <TDSMeter.h>

extern Utils utils;
extern unsigned long powerOnTimestamp;

void TDSMeter::initialise(uint8_t level)
{
  cubeLevel = level;
  initialisationSuccessful = true;
}

void TDSMeter::getReadings(float temperature)
{
  if (initialisationSuccessful) {
    while (millis() - powerOnTimestamp < 180000) {
      utils.debug(".", false);
      delay(10000); // Wait 3 min for sensor to stabilise
    }
    utils.debug("");

    int analogBuffer[SCOUNT]; // store the analog value in the array, read from ADC
    int analogBufferTemp[SCOUNT];
    int analogBufferIndex = 0, copyIndex = 0;
    float voltage;

    for (int i = 0; i < 20; i++)
    {
      // every 40 milliseconds,read the analog value from the ADC
      analogBuffer[analogBufferIndex] = analogRead(ANALOGUE1); // read the analog value and store into the buffer
      analogBufferIndex++;
      if (analogBufferIndex == SCOUNT)
        analogBufferIndex = 0;
      delay(40);
    }

    for (copyIndex = 0; copyIndex < SCOUNT; copyIndex++)
      analogBufferTemp[copyIndex] = analogBuffer[copyIndex];

    voltage = utils.getMedianNum(analogBufferTemp, SCOUNT) * (float)VREF / 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value

    // Temperature compensation requires value from DS18B20
    float compensationCoefficient = 1.0;
    if (temperature != INVALID)
    {
      compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0); // temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
    }

    float ec = voltage / compensationCoefficient; // temperature compensation

    // Apply calibration here - this is a placeholder
    float slope = 20.42;

    readings["electrical conductivity"] = ec * slope;

    readings["total dissolved solids"] = (133.42 * ec * ec * ec - 255.86 * ec * ec + 857.39 * ec) * 0.5; // convert voltage value to tds value
  }
  else {
    readings["electrical conductivity"] = INVALID;
    readings["total dissolved solids"] = INVALID;
  }
}
