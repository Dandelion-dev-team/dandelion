#include <Sensors.h>

extern Utils utils;
extern DynamicJsonDocument data;
extern WiFiConnection wiFiConnection;
extern Display ui;
extern MicroSDCardOperations cardOperation;
extern char messageBuffer[256];

using namespace std;

uint8_t progressTotal = 0;
uint8_t progressDone = 0;
char *levels[] = {"top", "middle", "bottom"};
unsigned long powerOnTimestamp = 0;
float temperatureBuffer;
// OneWire onewire(DATA1);
uint8_t i = 0;

GY30_BH1750 gy30;   // I2C - top level only
SHTC3 shtc3;        // I2C - top level only
TDSMeter ecTop;
TDSMeter ecMiddle;
TDSMeter ecBottom;
// PHSensor phTop;
// PHSensor phMiddle;
// PHSensor phBottom;

DS18B20Group ds18b20;

void Sensors::readData()
{
  ui.displayMessage("Reading sensors...");

  progressTotal = 200; // Expected number of seconds to read all sensors
  progressDone = 0;
  ui.progress(progressDone,progressTotal);

  // Read substrate temperature first so that it is available for adjusting the EC and pH readings
  powerOnTimestamp = utils.select(SET_2);

  ds18b20.initialise();
  ds18b20.getReadings();
  ds18b20.addReadingsToJSON();

  powerOnTimestamp = utils.select(SET_1);

  progressDone += 1;
  ui.progress(progressDone, progressTotal);

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

  progressDone += 2;
  ui.progress(progressDone, progressTotal);

  // EC
  ecTop.initialise(ANALOGUE1);
  ecTop.getReadings(data["top"]["substrate temperature"]);
  ecTop.addReadingsToJSON("top");

  ecMiddle.initialise(ANALOGUE2);
  ecMiddle.getReadings(data["middle"]["substrate temperature"]);
  ecMiddle.addReadingsToJSON("middle");

  ecBottom.initialise(ANALOGUE3);
  ecBottom.getReadings(data["bottom"]["substrate temperature"]);
  ecBottom.addReadingsToJSON("bottom");

  // powerOnTimestamp = select(SET_3);

  // // Wait 2 min for pH sensors to stabilise
  // while (millis() - powerOnTimestamp < 120000)
  // {
  //   progressDone += 10;
  //   ui.progress(progressDone, progressTotal);
  //   delay(10000);
  // }

  // phTop.initialise(ANALOGUE1);
  // phTop.getReadings(data["top"]["substrate temperature"]);
  // phTop.addReadingsToJSON("top");

  // phMiddle.initialise(ANALOGUE2);
  // phMiddle.getReadings(data["middle"]["substrate temperature"]);
  // phMiddle.addReadingsToJSON("middle");

  // phBottom.initialise(ANALOGUE3);
  // phBottom.getReadings(data["bottom"]["substrate temperature"]);
  // phBottom.addReadingsToJSON("bottom");

  // Save power by disabling sensors
  utils.initialise_pins();

  char jsonBuffer[MAXMESSAGESIZE];
  // serializeJsonPretty(data, jsonBuffer);
  serializeJson(data, jsonBuffer);
  Serial.println(jsonBuffer);

  ui.displayMessage("", 2);
  ui.displayMessage("");
}
