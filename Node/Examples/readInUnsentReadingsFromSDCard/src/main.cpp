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

//   fileName = "unsent.txt";
// }

// void loop() 
// {
//   if(SD.exists("unsent2.txt"))
//   {
//     File file = SD.open(fileName);
//     int i = 0;

//     DynamicJsonDocument doc(256);
//     String readings;

//     while(file.available())
//     {
//       i++;
//       readings = file.readStringUntil('}');
//       // Serial.println(readings);
//       // Serial.printf("This is round number %d\n", i);
//       deserializeJson(doc, readings);
//       Serial.println("After deserialisation, the readings are now:");
//       serializeJsonPretty(doc, Serial);
//       Serial.printf("This is round number %d\n", i);
//       // send to wifi
//     }
//   }
//   else
//   {
//     Serial.println("File doesn't exist");
//   }


//   delay(10000);
// }

// /*We want to:
// * 1 - read in the unsent data file
// * 2 - store the content in JSON
// */