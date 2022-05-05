#include <WiFiConnection.h>

<<<<<<< Updated upstream
extern MicroSDCardOperations cardOperation;
=======
// extern MicroSDCardOperations cardOperation;
>>>>>>> Stashed changes
extern DynamicJsonDocument configDoc; //global variable declared in main.cpp
extern Utils utils; // global utils object declared in main.cpp
extern Display ui;

String getTime(); //method declaration is just placed here as it is defined down the bottom of the class -- below methods that call it.

bool WiFiConnection::connectToWiFi()
{
    /*In this method, the wifi SSID and Password are read in from the configDoc file, which is a Json object that contains the config
    * information as stored on the MicroSD card. If the wifi connection after 10 seconds of trying is successful, the wifi logo on the display
    * is changed from disconnected to connected.
    */
<<<<<<< Updated upstream
    const char* ssid = configDoc["wifi"]["ssid"];
    const char* pwd = configDoc["wifi"]["password"];
    uint8_t i=0;

    utils.debug("Connecting to wifi", false);    
    WiFi.begin(ssid, pwd);
    unsigned long timeout = millis();

    while (WiFi.status() != WL_CONNECTED & (millis() - timeout < 10000))
    {
        utils.debug(".", false);
        delay(500);
    }
    if (WiFi.status() == WL_CONNECTED) {
        utils.debug("");
        utils.debug("Connected OK");
        Serial.println(WiFi.localIP());

        ui.displayWiFiIcon(true);
        return true;
    }
    else {
        utils.debug("");
        utils.debug("WiFi not connected");
        ui.displayWiFiIcon(false); // set wifi connection icon on e-paper display to disconnected.
        return false;
    }
}

bool WiFiConnection::sendData(unsigned char *data, uint16_t dataLength)
{
    /* Connect to the server and send the text message passed as a parameter
     * Typically, this is an AES-encrypted set of sensor readings.
     */

    char outgoing[MAXMESSAGESIZE];
    std::stringstream ss;
    
    utils.debug((char *)data);

    const char *host = configDoc["server"]["address"];
    uint16_t port = configDoc["server"]["port"];
    WiFiClient client;

    if (host == NULL)
    {
        Serial.println("Host not found in config.txt");
        return false;
    }
    else if (port == NULL)
    {
        Serial.println("Port not found in config.txt");
        return false;
    }
    else if (WiFi.status() == WL_CONNECTED) {
        strcpy(outgoing, "POST /api/uploadData HTTP/1.1\n");
        strcat(outgoing, "Content-Type: text/plain\n");
        strcat(outgoing, "User-Agent: Dandelion node\n");
        strcat(outgoing, "Accept: */*\n");
        strcat(outgoing, "Host: dandelion.sruc.ac.uk\n");
        strcat(outgoing, "Accept-Encoding: gzip, deflate, br\n");
        strcat(outgoing, "Connection: keep-alive\n");
        strcat(outgoing, "Content-Length: ");
        ss << dataLength;
        strcat(outgoing, ss.str().c_str());
        strcat(outgoing, "\n\n");
        data[dataLength] = '\0';
        strcat(outgoing, (char *)data);

        Serial.println(outgoing);

        if (client.connect(host, port))
        {
            client.print(outgoing);
            client.stop();
            return true;
        }
    }
    else {
        Serial.println("Wifi not connected when trying to send data");
        return false;
    }
}

String WiFiConnection::getTime()
{
=======
    // const char* ssid = configDoc["wifi"]["ssid"];
    // const char* pwd = configDoc["wifi"]["password"];
    String ssid = utils.getFromPreferences("ssid");
    String pwd = utils.getFromPreferences("pwd");

    if (ssid == "NOT SET" or pwd == "NOT SET") {
        ui.displayMessage("Wifi is not configured");
    }
    else {

        uint8_t i=0;

        utils.debug("Connecting to wifi", false);    
        WiFi.begin(ssid.c_str(), pwd.c_str());
        unsigned long timeout = millis();

        while (WiFi.status() != WL_CONNECTED & (millis() - timeout < 10000))
        {
            utils.debug(".", false);
            delay(500);
        }
        if (WiFi.status() == WL_CONNECTED) {
            utils.debug("");
            utils.debug("Connected OK");
            Serial.println(WiFi.localIP());

            ui.displayWiFiIcon(true);
            return true;
        }
        else {
            utils.debug("");
            utils.debug("WiFi not connected");
            ui.displayWiFiIcon(false); // set wifi connection icon on e-paper display to disconnected.
            return false;
        }
    }
}

bool WiFiConnection::sendData(unsigned char *data, uint16_t dataLength)
{
    /* Connect to the server and send the text message passed as a parameter
     * Typically, this is an AES-encrypted set of sensor readings.
     */

    char outgoing[MAXMESSAGESIZE];
    std::stringstream ss;
    
    utils.debug((char *)data);

    const char *host = configDoc["server"]["address"];
    uint16_t port = configDoc["server"]["port"];
    WiFiClient client;

    if (host == NULL)
    {
        Serial.println("Host not found in config.txt");
        return false;
    }
    else if (port == NULL)
    {
        Serial.println("Port not found in config.txt");
        return false;
    }
    else if (WiFi.status() == WL_CONNECTED) {
        strcpy(outgoing, "POST /api/uploadData HTTP/1.1\n");
        strcat(outgoing, "Content-Type: text/plain\n");
        strcat(outgoing, "User-Agent: Dandelion node\n");
        strcat(outgoing, "Accept: */*\n");
        strcat(outgoing, "Host: dandelion.sruc.ac.uk\n");
        strcat(outgoing, "Accept-Encoding: gzip, deflate, br\n");
        strcat(outgoing, "Connection: keep-alive\n");
        strcat(outgoing, "Content-Length: ");
        ss << dataLength;
        strcat(outgoing, ss.str().c_str());
        strcat(outgoing, "\n\n");
        data[dataLength] = '\0';
        strcat(outgoing, (char *)data);

        Serial.println(outgoing);

        if (client.connect(host, port))
        {
            client.print(outgoing);
            client.stop();
            return true;
        }
    }
    else {
        Serial.println("Wifi not connected when trying to send data");
        return false;
    }
}

String WiFiConnection::getTime()
{
>>>>>>> Stashed changes
    const char *ntpServer = "pool.ntp.org";
    const long gmtOffset_sec = 0;
    const int daylightOffset_sec = 3600;

    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    struct tm timeinfo;
    
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return INVALID_STR;
    }
    char timeAsCharArray[32];
    std::strftime(timeAsCharArray, 32, "%Y-%m-%dT%H:%M:%S", &timeinfo);
    String timeAsString = timeAsCharArray;

    return timeAsString;
}
<<<<<<< Updated upstream

// void WiFiConnection::sendDataToServer(DynamicJsonDocument& doc)
// {
//     /*In this method, sensor readings are passed in as a parameter in the form of a JSON object. The JSON doc is converted
//     * to a character array and sent using the Arduino WiFiClient class, after checking that the WiFi is connected and that we can reach
//     * the required server. The current time is also retrieved and appended to the JSON document in this method.
//     * The details of the server are read in from the global configDoc object. If we establish that WiFi connection is good,
//     * the next check is whether there exists an "unsent" file on the MicroSD card. This file is created and populated with data while there has not been a 
//     * connection established. If the file exists, these readings are dealt with first.
//     */
//     char jsonString[256]; //used to store converted JSON object in.
//     String time = getTime(); //internal method returns time as String.
//     doc["time"] = time; //append time to JSON object.
    
//     serializeJson(doc, jsonString); //convert from JSON to character array.

//     Serial.println(jsonString); //for testing purposes only.
    
//     const char* host = configDoc["server"]["address"];
//     uint16_t port = configDoc["server"]["port"];
//     WiFiClient client;

//     if (host == NULL) {
//         Serial.println("Host not found in config.txt");
//     }
//     else if (port == NULL)
//     {
//         Serial.println("Port not found in config.txt");
//     }
//     else if(WiFi.status() == WL_CONNECTED)
//     {
//         //call MicroSDCardOperation method to check if unsent file exists, and if so they are sent.
//         cardOperation.getUnsentReadings();

//         /*The sending of data to the server using WiFiClient class from the Arduino WiFi library MUST
//         * be wrapped inside the if block below. It does not work otherwise.
//         */
//         if(client.connect(host, port)) 
//         {
//             client.println("POST /api/uploadData HTTP/1.1");
//             client.println("Content-Type: application/json");
//             client.print("Content-Length: ");
//             client.println(strlen(jsonString));
//             client.println();
//             client.print(jsonString);

//             if (client.connected())
//             {
//                 client.stop();
//             }

//             delay(4000);
//         }

//         //call appropriate MicroSDCardOperation method to store in READINGS.
//         cardOperation.storeJsonOnFile(jsonString, "readings.txt");
//     }
//     else
//     {
//         /*There has been a problem connecting to Wi-Fi. The readings will be stored in the unsent.txt file, so
//         * a call to the appropriate MicroSDCardOperation method for storing JSON on file is made, passing in the file name
//         * as an argument along with the JSON String.
//         */
//         cardOperation.storeJsonOnFile(jsonString, "unsent.txt");
//         Serial.println("couldn't connect to wifi"); //for testing purposes only.
//         ui.displayWiFiIcon(false); //set wifi connection icon on e-paper display to disconnected.
//     }
// }

// void WiFiConnection::sendUnsentReadings(DynamicJsonDocument& doc)
// {
//     /*This method is called from within the getUnsentReadings method in the MicroSDCardOperations class. This method takes in a 
//     * DynamicJsonDocument reference, serialises it to a character array, and sends it to the database over Wi-Fi.
//     */

//     char jsonString[256];
//     serializeJson(doc, jsonString); //Convert from JSON to String.

//     const char *host = configDoc["server"]["address"];
//     uint16_t port = configDoc["server"]["port"];
//     WiFiClient client;

//     if(client.connect(host, port)) 
//     {
//         client.print(jsonString);
//         delay(4000);
//         client.stop();
//     }
    
//     //call MicroSDCardOperation method to store in READINGS.
//     cardOperation.storeJsonOnFile(jsonString, "readings.txt");
// }
=======
>>>>>>> Stashed changes
