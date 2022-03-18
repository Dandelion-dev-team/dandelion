#include <mySD.h>

File root;

#define SDCARD_CS 13
#define SDCARD_MOSI 15
#define SDCARD_MISO 2
#define SDCARD_CLK 14

void printDirectory(File dir, int numTabs) {
  
  while(true) {
     File entry =  dir.openNextFile();
     if (! entry) {
       break;
     }
     for (uint8_t i=0; i<numTabs; i++) {
       Serial.print('\t');   // we'll have a nice indentation
     }
     // Print the name
     Serial.print(entry.name());
     /* Recurse for directories, otherwise print the file size */
     if (entry.isDirectory()) {
       Serial.println("/");
       printDirectory(entry, numTabs+1);
     } else {
       /* files have sizes, directories do not */
       Serial.print("\t\t");
       Serial.println(entry.size());
     }
     entry.close();
   }
}

void retrieveWifiCredentials()
{
  /*this method shows an example of reading data from a text file on the SD card.
  * note that when reading in the file and displaying to the serial, .write() method is used,
  * rather than println()
  */
  File credentials = SD.open("/unsent.txt");
  
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

  root = SD.open("/");

  if(root)
  {
    printDirectory(root, 0);
    root.close();
  }

  retrieveWifiCredentials();

}

void loop ()
{
 
}