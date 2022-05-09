#include <ProcessReadings.h>

extern Utils utils;
extern MicroSDCardOperations cardOperation;
extern DataTransformation dataTransformation;
extern WiFiConnection wiFiConnection;
extern Display ui;
extern Preferences preferences;
extern DynamicJsonDocument data;

bool ProcessReadings::sendToServer()
{
    /*This method is called from the WifiConnection class before the latest readings are attempted to be sent to the server.
     * The method checks if the unsent.txt file exists, and if so, reads in all the data from it. Each JSON string is read in
     * from the file, deserialised back into to a DynamicJsonDocument, and then sent to the appropriate method in the WifiConnection class so it can be sent.
     * The reason they are formatted back to a true JSON object again is to ensure the integrity.
     * If just sending the String straight from file, the closing curly brace is missing due to the way in which each individual
     * Json string is read in. At the end of the method, after all the unsent readings have been dealt with, the file is deleted since
     * there are no more unsent readings that require to be sent.
     */

    unsigned char message[MAXMESSAGESIZE];
    uint16_t msgLength = 0;
    std::vector<String> unsent = cardOperation.getUnsentReadings();
    String jsonString = "";

    for (uint8_t j=0; j<unsent.size(); j++) {
        Serial.println(unsent[j]);
    }

    // cardOperation.storeJsonOnFile(bytearray, "unsent.txt");  // TESTING

    if (wiFiConnection.connectToWiFi())
    {
        data["timestamp"] = wiFiConnection.getTime();
        data["mac"] = WiFi.macAddress();
        data["battery"] = utils.get_battery_percent();

        serializeJson(data, jsonString); // convert from JSON to character array.

        unsigned char bytearray[jsonString.length() + 1];
        jsonString.getBytes(bytearray, jsonString.length() + 1);

        for (uint16_t i = 0; i < unsent.size(); i++)
        {
            msgLength = dataTransformation.encrypt((unsigned char *)unsent[i].c_str(), message);
            if (wiFiConnection.sendData(message, msgLength))
            {
                cardOperation.storeJsonOnFile(unsent[i], "/readings.txt");
            }
            else {
                Serial.println("Error while sending cached readings");
                return false;
            }
        }

        cardOperation.deleteUnsentFile();

        msgLength = dataTransformation.encrypt(bytearray, message);
        Serial.print("msgLength: ");
        Serial.println(msgLength);

        if (wiFiConnection.sendData(message, msgLength))
        {
            // call appropriate MicroSDCardOperation method to store in READINGS.
            cardOperation.storeJsonOnFile(jsonString, "/readings.txt");
        }
        else
        {
            Serial.println("Error while sending new readings");
            /*There has been a problem connecting to Wi-Fi. The readings will be stored in the unsent.txt file, so
             * a call to the appropriate MicroSDCardOperation method for storing JSON on file is made, passing in the file name
             * as an argument along with the JSON String.
             */
            cardOperation.storeJsonOnFile(jsonString, "/unsent.txt");
            return false;
        }
    }
}
