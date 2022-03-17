#include <Arduino.h>
#include <WiFi.h>
#include "time.h"
#include <ctime>

const char* ssid = "BT-TZAT2F";
const char* password = "ReyrHg7Qqvea4c";

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 0;
const int daylightOffset_sec = 0;

void printLocalTime()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
	
	
	// // Code for converting tm to character array:
    // char buffer[32];
    // std::strftime(buffer, 32, "%A, %B %d %Y %H:%M:%S", &timeinfo);

    // Serial.print("The buffer is: ");
    // Serial.println(buffer);
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
  Serial.println(" CONNECTED");
  
  //init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  printLocalTime();

  //disconnect WiFi as it's no longer needed
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

void loop() 
{
  delay(1000);
  printLocalTime();
}