#include <Arduino.h>
#include <mySD.h>

#define SDCARD_CS 13
#define SDCARD_MOSI 15
#define SDCARD_MISO 2
#define SDCARD_CLK 14

void retrieveWifiCredentials()
{
  /*this method shows an example of reading data from a text file on the SD card.
  * note that when reading in the file and displaying to the serial, .write() method is used,
  * rather than println()
  */
  File credentials = SD.open("config.txt");
  
  while(credentials.available())
  {
    Serial.write(credentials.read());
  }

  credentials.close();
}


void setup()
{

  Serial.begin(115200);

  if(!SD.begin(SDCARD_CS, SDCARD_MOSI, SDCARD_MISO, SDCARD_CLK))
  {
    Serial.println("SD card initialisation failure");
    return;
  }

  Serial.println("SD card initialised");

}

void loop ()
{
  delay(4000);
  retrieveWifiCredentials();
}