#include <WiFiConnection.h>

// extern MicroSDCardOperations cardOperation;
extern Utils utils; // global utils object declared in main.cpp
extern Display ui;
extern String timeNow;

String getTime(); //method declaration is just placed here as it is defined down the bottom of the class -- below methods that call it.

bool WiFiConnection::connectToWiFi()
{
    /*In this method, the wifi SSID and Password are read in from the configDoc file, which is a Json object that contains the config
    * information as stored on the MicroSD card. If the wifi connection after 10 seconds of trying is successful, the wifi logo on the display
    * is changed from disconnected to connected.
    */
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

            // Try to set time from a server
            timeNow = getTime();

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

    const char *host = "dandelion.sruc.ac.uk";
    uint16_t port = 80;
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
