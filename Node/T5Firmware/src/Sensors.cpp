#include <Sensors.h>

extern Utils utils;
extern DynamicJsonDocument data;
extern WiFiConnection wiFiConnection;
extern Display ui;

void initialise_pins();
using namespace std;
unsigned long select(int...);
void addReadingsToJson(uint8_t, SensorModule);

char *levels[] = {"top", "middle", "bottom"};
unsigned long powerOnTimestamp = 0;
float temperatureBuffer;
OneWire onewire(DATA1);

GY30_BH1750 gy30;   // I2C - top level only
SHTC3 shtc3;        // I2C - top level only
// BMP280 bmp;         // I2C - top level only
TDSMeter ec;        // Electrical conductivity - level is reset internally when intitialised
Moisture moisture;  // Electrical conductivity - level is reset internally when intitialised
PHSensor phTop;     // pH sensors are defined for each level separately
// PHSensor phMiddle;
// PHSensor phBottom;

DallasTemperature ds18b20(&onewire); // Only sensor not derived from the SensorModule class

void Sensors::readData()
{
  /*In this method, we will go through each of the Levels and sensor Sets within the Grow Cube. When a 
  * level is selected, we call the initialise() method to first turn off power to every level and set,
  * and then turn on power to only the level and set that has been selected. After the last
  * level and set have had their readings taken, the SensorModule class handles the rest of the process from this point.
  */

  ui.displayMessage("Reading sensors...");

  // Read substrate temperature first so that it is available for adjusting the EC and pH readings
  // powerOnTimestamp = select(4, TOP, MIDDLE, BOTTOM, SET_2);
  powerOnTimestamp = select(2, TOP, SET_2);

  onewire.begin(DATA1);
  ds18b20.begin();

  delay(100);
  ds18b20.requestTemperatures();
  data["top"]["substrate temperature"] = ds18b20.getTempCByIndex(0);
  utils.debug("Substrate temperature: ", false);
  utils.debug(ds18b20.getTempCByIndex(0));

  // data["middle"]["substrate temperature"] = ds18b20.getTempCByIndex(1);
  // data["bottom"]["substrate temperature"] = ds18b20.getTempCByIndex(2);

  powerOnTimestamp = select(2, TOP, SET_1);

  Wire.begin(SDA, SCL);
  delay(1000);

  // Pressure
  // bmp.initialise();
  // bmp.getReadings();
  // bmp.addReadingsToJSON("top");

  // Lux
  gy30.initialise();
  gy30.getReadings();
  gy30.addReadingsToJSON("top");

  // Temp + humidity
  shtc3.initialise();
  shtc3.getReadings();
  shtc3.addReadingsToJSON("top");

  // Electrical conductivity
  ec.initialise(TOP);
  ec.getReadings(data["top"]["substrate temperature"]);
  ec.addReadingsToJSON("top");

  powerOnTimestamp = select(2, TOP, SET_2);

  // Moisture
  moisture.initialise(TOP);
  moisture.getReadings();
  moisture.addReadingsToJSON("top");

  // powerOnTimestamp = select(2, MIDDLE, SET_1);

  // // Electrical conductivity
  // ec.initialise(MIDDLE);
  // ec.getReadings();
  // ec.addReadingsToJSON("middle");

  // powerOnTimestamp = select(2, MIDDLE, SET_2);

  // // Moisture
  // moisture.initialise(MIDDLE);
  // moisture.getReadings();
  // moisture.addReadingsToJSON("middle");

  // powerOnTimestamp = select(2, BOTTOM, SET_1);

  // // Electrical conductivity
  // ec.initialise(BOTTOM);
  // ec.getReadings();
  // ec.addReadingsToJSON("bottom");

  // powerOnTimestamp = select(2, BOTTOM, SET_2);

  // // Moisture
  // moisture.initialise(BOTTOM);
  // moisture.getReadings();
  // moisture.addReadingsToJSON("bottom");

  // powerOnTimestamp = select(4, TOP, MIDDLE, BOTTOM, SET_3);
  powerOnTimestamp = select(2, TOP, SET_3);

  phTop.initialise(ANALOGUE1);
  phTop.getReadings(data["top"]["substrate temperature"]);
  phTop.addReadingsToJSON("top");

  // phMiddle.initialise(ANALOGUE2);
  // phMiddle.getReadings();
  // phMiddle.addReadingsToJSON("middle"");

  // phBottom.initialise(ANALOGUE3);
  // phBottom.getReadings();
  // phBottom.addReadingsToJSON("bottom");


  ui.displayMessage("");

}

void initialise_pins() {
  digitalWrite(TOP, LOW);
  digitalWrite(MIDDLE, LOW);
  digitalWrite(BOTTOM, LOW);
  digitalWrite(SET_1, LOW);
  digitalWrite(SET_2, LOW);
  digitalWrite(SET_3, LOW);
}

unsigned long select(int num, ...) {
  va_list valist;
  uint8_t this_pin;
  initialise_pins();
  char message_buffer[20];

  va_start(valist, num); // initialize valist for num number of arguments
  for (uint8_t i = 0; i < num; i++)
  {
    this_pin = va_arg(valist, int);
    sprintf(message_buffer, "Setting pin %d\n", this_pin);
    utils.debug(message_buffer, false);
    digitalWrite(this_pin, HIGH);
  }
  va_end(valist); // clean memory reserved for valist

  return millis();
}
