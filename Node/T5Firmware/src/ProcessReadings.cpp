#include <ProcessReadings.h>

extern Utils utils;
extern MicroSDCardOperations cardOperation;
extern DataTransformation dataTransformation;
extern WiFiConnection wiFiConnection;
extern Display ui;
extern DynamicJsonDocument data;
extern String timeNow;

bool ProcessReadings::sendToServer()
{
    unsigned char *message = new unsigned char[MAXMESSAGESIZE]();
    uint16_t msgLength = 0;
    std::vector<String> unsent = cardOperation.getUnsentReadings();
    String jsonString = "";

    // for (uint8_t j=0; j<unsent.size(); j++) {
    //     Serial.println(unsent[j]);
    // }

    if (wiFiConnection.connect())
    {
        wiFiConnection.getTime();
        data["timestamp"] = timeNow;
        data["mac"] = WiFi.macAddress();
        // data["battery"] = utils.get_battery_percent();
        data["battery"] = INVALID;

        cardOperation.log("Serialising JSON");
        serializeJson(data, jsonString); // convert from JSON to character array.

        unsigned char bytearray[jsonString.length() + 1];
        jsonString.getBytes(bytearray, jsonString.length() + 1);

        if (unsent.size() > 0) {
            for (uint16_t i = 0; i < unsent.size(); i++)
            {
                msgLength = dataTransformation.encrypt((unsigned char *)unsent[i].c_str(), message);
                if (wiFiConnection.sendData(message, msgLength))
                {
                    cardOperation.appendToFile(unsent[i], "/readings.txt");
                }
                else {
                    cardOperation.log("Error while sending cached readings");
                    wiFiConnection.disconnect();
                    delete message;
                    return false;
                }
            }
            cardOperation.deleteUnsentFile();
        }

        msgLength = dataTransformation.encrypt(bytearray, message);

        char *buffer = new char[256]();
        itoa(msgLength, buffer, 10);
        cardOperation.log("Message length = ", buffer);
        delete buffer;

        if (wiFiConnection.sendData(message, msgLength))
        {
            cardOperation.appendToFile(jsonString, "/readings.txt");
            cardOperation.log("Data written to readings.txt");
            wiFiConnection.disconnect();
            delete message;
            return true;
        }
        else
        {
            cardOperation.appendToFile(jsonString, "/unsent.txt");
            cardOperation.log("Data written to unsent.txt");
            wiFiConnection.disconnect();
            delete message;
        }
    }
    else
    {
        cardOperation.appendToFile(jsonString, "/unsent.txt");
    }
    return false;
}
