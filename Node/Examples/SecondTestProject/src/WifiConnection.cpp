#include <WifiConnection.h>

MicroSDCardOperations cardOperation;

void WifiConnection::sendDataToServer(DynamicJsonDocument& doc)
{
    char jsonString[256];
    serializeJsonPretty(doc, jsonString);
    Serial.println(jsonString);
    
    WiFiClient client;
    WiFi.begin("BT-TZAT2F", "ReyrHg7Qqvea4c"); //missing the last 'c' to test that readings are stored in unsent.txt
    delay(8000);
    if(WiFi.status() == WL_CONNECTED)
    {
        //call MicroSDCardOperation method to check unsent file
        cardOperation.getUnsentReadings();

        //send data
        if(client.connect("192.168.1.96", 21))
        {
            client.print(jsonString);
            delay(4000);
            client.stop();
        }

        //call MicroSDCardOperation method to store in READINGS
        cardOperation.storeJsonOnFile(jsonString, "readings.txt");
    }
    else
    {
        //There has been a problem connecting to Wi-Fi. Must call MicroSDCardOperation method to store in unsent.txt file.
        cardOperation.storeJsonOnFile(jsonString, "unsent.txt");
        Serial.println("couldn't connect to wifi");
    }

}

void WifiConnection::sendUnsentReadings(DynamicJsonDocument& doc)
{
    /*This method is called from within the getUnsentReadings method in the MicroSDCardOperations class. This method takes in a 
    * DynamicJsonDocument reference, serialises it to a character array, and sends it to the database over Wi-Fi.
    */

    char jsonString[256];
    serializeJsonPretty(doc, jsonString); //Converts JSON to String
    
    WiFiClient client;
    WiFi.begin("BT-TZAT2F", "ReyrHg7Qqvea4c");
    delay(8000);
    if(WiFi.status() == WL_CONNECTED)
    {
        //send data
        if(client.connect("192.168.1.96", 21))
        {
            client.print(jsonString);
            delay(4000);
            client.stop();
        }
    }
    
    //call MicroSDCardOperation method to store in READINGS
    cardOperation.storeJsonOnFile(jsonString, "readings.txt");
}