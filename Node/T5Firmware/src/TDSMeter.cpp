#include <TDSMeter.h>

extern Utils utils;
extern unsigned long powerOnTimestamp;

void TDSMeter::initialise(uint8_t datapin)
{
  cubeLevel = datapin;
  initialisationSuccessful = true;
}

float TDSMeter::slope()
{
  if (cubeLevel == ANALOGUE1) 
    return utils.getFromPreferences("ects", (float)ECTS);
  else if (cubeLevel == ANALOGUE2)
    return utils.getFromPreferences("ecms", (float)ECMS);
  else if (cubeLevel == ANALOGUE3)
    return utils.getFromPreferences("ecbs", (float)ECBS);
  else
    return 1;
}

float TDSMeter::offset()
{
  if (cubeLevel == ANALOGUE1)
    return utils.getFromPreferences("ecto", (float)ECTO);
  else if (cubeLevel == ANALOGUE2)
    return utils.getFromPreferences("ecmo", (float)ECMO);
  else if (cubeLevel == ANALOGUE3)
    return utils.getFromPreferences("ecbo", (float)ECBO);
  else
    return 0;
}

void TDSMeter::getReadings(float temperature)
{
  if (initialisationSuccessful) {
    int analogBuffer[SCOUNT]; // store the analog value in the array, read from ADC
    int analogBufferTemp[SCOUNT];
    int analogBufferIndex = 0, copyIndex = 0;
    float voltage;

    for (int i = 0; i < SCOUNT; i++)
    {
      // every 40 milliseconds,read the analog value from the ADC
      analogBuffer[analogBufferIndex] = analogRead(cubeLevel); // read the analog value and store into the buffer
      pinMode(cubeLevel, INPUT_PULLDOWN); // analogueRead() disables the internal pulldown. This reinstates it ready for next time
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

    Serial.print("EC ");
    Serial.print(cubeLevel);
    Serial.print(" value ");
    Serial.println(ec);

    // Apply calibration from preferences
    float thisSlope = slope();
    float thisOffset = offset();
    
    Serial.print(" slope ");
    Serial.print(thisSlope);
    Serial.print(" offset ");
    Serial.println(thisOffset);

    readings["electrical conductivity"] = ec * thisSlope + thisOffset;
    Serial.print(" result ");
    Serial.println(readings["electrical conductivity"]);

    readings["total dissolved solids"] = (133.42 * ec * ec * ec - 255.86 * ec * ec + 857.39 * ec) * 0.5; // convert voltage value to tds value
  }
  else {
    readings["electrical conductivity"] = INVALID;
    readings["total dissolved solids"] = INVALID;
  }
}
