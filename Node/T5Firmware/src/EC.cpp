#include <EC.h>

extern Utils utils;
extern unsigned long powerOnTimestamp;

void EC::initialise(uint8_t level)
{
  cubeLevel = level;
  initialisationSuccessful = true;
}

void EC::getCoefficiants(float (&coeffs)[3], bool high)
{
  if (cubeLevel == TOP)
  {
    if (high) {

      coeffs[0] = utils.getFromPreferences("echc", (float)ECHC);
      coeffs[1] = utils.getFromPreferences("echx", (float)ECHX);
      coeffs[2] = utils.getFromPreferences("echx2", (float)ECHX2);
    }
    else {
      coeffs[0] = utils.getFromPreferences("ectc", (float)ECTC);
      coeffs[1] = utils.getFromPreferences("ectx", (float)ECTX);
      coeffs[2] = utils.getFromPreferences("ectx2", (float)ECTX2);
    }
  }
  else if (cubeLevel == MIDDLE) {
    coeffs[0] = utils.getFromPreferences("ecmc", (float)ECMC);
    coeffs[1] = utils.getFromPreferences("ecmx", (float)ECMX);
    coeffs[2] = utils.getFromPreferences("ecmx2", (float)ECMX2);
  }
  else
  {
    coeffs[0] = utils.getFromPreferences("ecbc", (float)ECBC);
    coeffs[1] = utils.getFromPreferences("ecbx", (float)ECBX);
    coeffs[2] = utils.getFromPreferences("ecbx2", (float)ECBX2);
  }
  // preferences.end();
}

void EC::getReadings(float temperature)
/// EC getReadings
///
/// This function is derived from the library function provided by DFRobot. Observations:
/// * Temperature compensation is applied to the calculated EC values after calibration factors are applied
/// * Library function assumes no vertical offset - not true in the node top-layer case because of interference from the pH sensor
/// * Library function applies two different calibration factors, one where the raw EC value lies betwwen 0 and 2, and another above 2
/// * Library procedure is: 1) apply lower calibration factor 2) if result > 2.5 go back and apply higher factor instead
/// * Tests showed that a polynomial function was a better fit to the data. The two ranges in the library function appear to be an approximation to this
///
/// Because of these observations, the calibration procedure requires three points, 0 TDS, low TDS and high TDS
/// This give a set of three coefficiants (a0, a1 and a2) applied to a 2nd order polynomial where the subscript corresponds to the power of the variable
/// i.e y = a_2.x^2 + a_1.x + a_0
{
  if (initialisationSuccessful) {
    float voltage = 0;
    float var = 0;

    strcpy(messageBuffer, "Reading ");
    strcat(messageBuffer, LEVELNAMES[cubeLevel]);
    strcat(messageBuffer, " EC data");
    cardOperation.log(messageBuffer);

    std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[cubeLevel]);
    voltage = voltage * (float)ESPVOLTAGE / ESPADC;

    Serial.print("Voltage: ");
    Serial.println(voltage);

    // Find calibration coefficients
    getCoefficiants(coeffs, (voltage > EC_VOLTAGE_THRESHOLD));

    // Apply calibration
    readings["electrical conductivity"] = coeffs[2] * voltage * voltage + coeffs[1] * voltage + coeffs[0];

    Serial.print(" result ");
    Serial.println(readings["electrical conductivity"]);

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

    readings["total dissolved solids"] = (133.42 * ec * ec * ec - 255.86 * ec * ec + 857.39 * ec) * 0.5; // convert voltage value to tds value
  }
  else {
    readings["electrical conductivity"] = INVALID;
    readings["total dissolved solids"] = INVALID;
  }
}
