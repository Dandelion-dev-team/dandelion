// #include <Arduino.h>
// #include <mySD.h>
// #include <ArduinoJson.h>
// #include <map>
// #include <iterator>

// #define SDCARD_CS 13
// #define SDCARD_MOSI 15
// #define SDCARD_MISO 2
// #define SDCARD_CLK 14

// const char* fileName;

// void setup() 
// {
//   Serial.begin(115200);

//   SD.begin(SDCARD_CS, SDCARD_MOSI, SDCARD_MISO, SDCARD_CLK);

//   fileName = "config.txt";
// }

// void loop() 
// {
//   File file = SD.open(fileName);

//   DynamicJsonDocument doc(256);
//   String readings;

//   readings = file.readString();
//   deserializeJson(doc, readings);
//   Serial.println("\nAfter deserialisation, the readings are now:");
//   serializeJsonPretty(doc, Serial);
//   String ssid = doc["wifiCredentials"][0];
//   Serial.print("\n\nThe ssid in the wifiCredentials array in the config file is ");
//   Serial.println(ssid);

//   delay(10000);
// }