#include <ArduinoJson.h>

void setup()
{
  Serial.begin(9600);

  StaticJsonDocument<200> doc;

  doc["nodeId"] = "KF123";
  doc["sensorMeasurement"] = "Luminosity";
  doc["reading"] = 650;

  serializeJson(doc, Serial);
  Serial.println();
  delay(2000);
  serializeJsonPretty(doc, Serial);
}

void loop()
{

}