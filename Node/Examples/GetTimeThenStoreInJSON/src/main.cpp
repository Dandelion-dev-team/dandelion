#include <Arduino.h>
#include <WiFi.h>
#include <time.h>
#include <ctime>
#include <ArduinoJson.h>

const char* ssid = "a wifi network";
const char* password = "technogym";

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 0;
const int daylightOffset_sec = 0;

DynamicJsonDocument doc(256);

void printTime()
{
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo))
  {
      Serial.println("Failed to obtain time");
      return;
  }
  char buffer[32];
  std::strftime(buffer, 32, "%A, %B %d %Y %H:%M:%S", &timeinfo);

  // String string = buffer;
  doc["time"] = buffer;
  serializeJsonPretty(doc, Serial);
}

void setup() 
{
  Serial.begin(115200);

  //connect to wifi
  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  
  //init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  printTime();

  //disconnect WiFi as it's no longer needed
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

void loop() 
{
  delay(2000);
  printTime();
}