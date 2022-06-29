#include <Sensors.h>

extern Utils utils;
extern DynamicJsonDocument data;
extern WiFiConnection wiFiConnection;
extern Display ui;
extern MicroSDCardOperations cardOperation;
extern char messageBuffer[256];

using namespace std;

char *levels[] = {"top", "middle", "bottom"};
unsigned long powerOnTimestamp = 0;
float temperatureBuffer;
uint8_t i = 0;

GY30_BH1750 gy30;   // I2C - top level only
SHTC3 shtc3;        // I2C - top level only
EC ecTop, ecMiddle, ecBottom;
DS18B20Group ds18b20;

void Sensors::readData()
{
  ui.displayText("Reading sensors...", ui.boxes[1]);

  // Read substrate temperature first so that it is available for adjusting the EC and pH readings
  powerOnTimestamp = utils.select(SET_2);

  ds18b20.initialise();
  ds18b20.getReadings();
  ds18b20.addReadingsToJSON();

  powerOnTimestamp = utils.select(SET_1);

  Wire.begin(SDA, SCL);
  delay(1000);

  // Lux
  gy30.initialise();
  gy30.getReadings();
  gy30.addReadingsToJSON("top");

  // Temp + humidity
  shtc3.initialise();
  shtc3.getReadings();
  shtc3.addReadingsToJSON("top");

  // EC
  ecTop.initialise(TOP);
  ecTop.getReadings(data["top"]["substrate temperature"]);
  ecTop.addReadingsToJSON("top");

  ecMiddle.initialise(MIDDLE);
  ecMiddle.getReadings(data["middle"]["substrate temperature"]);
  ecMiddle.addReadingsToJSON("middle");

  ecBottom.initialise(BOTTOM);
  ecBottom.getReadings(data["bottom"]["substrate temperature"]);
  ecBottom.addReadingsToJSON("bottom");

  // Save power by disabling sensors
  utils.initialise_pins();

  char jsonBuffer[MAXMESSAGESIZE];
  // serializeJsonPretty(data, jsonBuffer);
  serializeJson(data, jsonBuffer);
  Serial.println(jsonBuffer);

  ui.clearScreen();
}

void adjust(std::vector<float> &x, std::vector<float> &y, std::vector<float> &coeffs) 
{
  float buffer = 0;
  float total = 0;

  for (uint8_t i=0; i<3; i++){
    buffer = coeffs[2] * x[i] * x[i] + coeffs[1] * x[i] + coeffs[0];
    total += abs(y[i] - buffer);
  }

  coeffs[0] -= total / 3;
}

void Sensors::calibrateEC()
{
  float voltage = 0;
  float var = 0;
  float topAdjustment = 0;  // ToDo: rework Utils::polyRegression to improve the fit. Then we can lose this fudge factor

  std::vector<float> xValues[3];
  std::vector<float> yValues;
  std::vector<float> coeffs;
  coeffs.resize(3);

  ecTop.initialise(TOP);
  ecMiddle.initialise(MIDDLE);
  ecBottom.initialise(BOTTOM);

  if (ecTop.initialisationSuccessful and
      ecMiddle.initialisationSuccessful and
      ecBottom.initialisationSuccessful)  {

    // Get temperature readings
    utils.select(SET_2);
    ds18b20.initialise();
    ds18b20.getReadings();

    utils.select(SET_1);
    ui.proceed("Extract sensors", "then press the button", 300);
    ui.displayText("Calibrating", ui.boxes[1]);
    ui.displayText("Please be patient...", ui.boxes[2]);
    yValues.push_back(0.0);

    // Wait for readings to stabilise
    delay(20000);
    for (uint8_t level=0; level<3; level++) {
      std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[level]);
      xValues[level].push_back(voltage * (float)ESPVOLTAGE / ESPADC);

      Serial.print(LEVELNAMES[level]);
      Serial.print(": ");
      Serial.print(xValues[level][0]);
      Serial.print("  ");
    }
    Serial.println();

    ui.clearScreen();
    yValues.push_back((float)ui.numericInput("Enter low EC value", 300));

    ui.clearScreen();
    ui.proceed("Place in low EC", "then press the button", 300);
    ui.displayText("Calibrating", ui.boxes[1]);
    ui.displayText("Please be patient...", ui.boxes[2]);

    // Wait for readings to stabilise
    delay(20000);
    for (uint8_t level = 0; level < 3; level++)
    {
      std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[level]);
      xValues[level].push_back(voltage * (float)ESPVOLTAGE / ESPADC);

      Serial.print(LEVELNAMES[level]);
      Serial.print(": ");
      Serial.print(xValues[level][1]);
      Serial.print("  ");
    }
    Serial.println();

    ui.clearScreen();
    yValues.push_back((float)ui.numericInput("Enter high EC value", 300));

    ui.clearScreen();
    ui.proceed("Place in high EC", "then press the button", 300);
    ui.displayText("Calibrating", ui.boxes[1]);
    ui.displayText("Please be patient...", ui.boxes[2]);

    // Wait for readings to stabilise
    delay(20000);
    for (uint8_t level = 0; level < 3; level++)
    {
      std::tie(voltage, var) = utils.analogReadStats(ANALOGUEPINS[level]);
      xValues[level].push_back(voltage * (float)ESPVOLTAGE / ESPADC);
      Serial.print(LEVELNAMES[level]);

      Serial.print(": ");
      Serial.print(xValues[level][2]);
      Serial.print("  ");
    }
    Serial.println();

    ui.clearScreen();
    ui.displayText("Calculating and saving", ui.boxes[1]);
    delay(2000);

    utils.polyRegression(xValues[TOP], yValues, coeffs, 100);
    adjust(xValues[TOP], yValues, coeffs);
    if (xValues[TOP][0] > EC_VOLTAGE_THRESHOLD) {
      utils.saveToPreferences("echc", coeffs[0]);
      utils.saveToPreferences("echx", coeffs[1]);
      utils.saveToPreferences("echx2", coeffs[2]);
    }
    else {
      utils.saveToPreferences("ectc", coeffs[0]);
      utils.saveToPreferences("ectx", coeffs[1]);
      utils.saveToPreferences("ectx2", coeffs[2]);
    }

    utils.polyRegression(xValues[MIDDLE], yValues, coeffs, 100);
    utils.saveToPreferences("ecmc", coeffs[0]);
    utils.saveToPreferences("ecmx", coeffs[1]);
    utils.saveToPreferences("ecmx2", coeffs[2]);

    utils.polyRegression(xValues[BOTTOM], yValues, coeffs, 100);
    utils.saveToPreferences("ecbc", coeffs[0]);
    utils.saveToPreferences("ecbx", coeffs[1]);
    utils.saveToPreferences("ecbx2", coeffs[2]);

    ui.clearScreen();
    ui.proceed("Replace sensors", "then press the button", 300);
    ui.clearScreen();
    ui.displayText("Finished", ui.boxes[1]);
    ui.displayText("Rebooting...", ui.boxes[2]);
    ESP.restart();
  }
  else
  {
    ui.displayText("Sensors not found!", ui.boxes[1], true);
    ui.displayText("Aborting...", ui.boxes[2]);
    ESP.restart();
  }
}