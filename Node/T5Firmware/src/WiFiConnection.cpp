#include <WiFiConnection.h>

// extern MicroSDCardOperations cardOperation;
extern Utils utils; // global utils object declared in main.cpp
extern Display ui;
extern String timeNow;
extern MicroSDCardOperations cardOperation;

String getTime(); //method declaration is just placed here as it is defined down the bottom of the class -- below methods that call it.

bool WiFiConnection::connect()
{
    String ssid = utils.getFromPreferences("ssid");
    String pwd = utils.getFromPreferences("pwd");

    if (ssid == "NOT SET" or pwd == "NOT SET") {
        ui.displayMessage("Wifi is not configured");
        return false;
    }
    else {
        Serial.print("Connecting to wifi");
        esp_wifi_start();
        WiFi.begin(ssid.c_str(), pwd.c_str());
        unsigned long timeout = millis();

        while (WiFi.status() != WL_CONNECTED & (millis() - timeout < 10000))
        {
            Serial.print(".");
            delay(500);
        }

        Serial.println();
        if (WiFi.status() == WL_CONNECTED)
        {
            char buffer[16];
            strncpy(buffer, WiFi.localIP().toString().c_str(), 15);
            cardOperation.log("Connected to wifi as ", (const char *)buffer);

            ui.displayWiFiIcon(true);
            return true;
        }
        else {
            cardOperation.log("WiFi not connected");
            ui.displayWiFiIcon(false); // set wifi connection icon on e-paper display to disconnected.
            return false;
        }
    }
}

bool WiFiConnection::sendData(unsigned char *data, uint16_t dataLength)
{
    char *outgoing = new char[MAXMESSAGESIZE]();
    std::stringstream ss;

    const char *host = "dandelion.sruc.ac.uk";
    uint16_t port = 80;

    WiFiClient client;

    if (WiFi.status() == WL_CONNECTED) {
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

        if (client.connect(host, port))
        {
            client.print(outgoing);
            client.stop();
            delete outgoing;
            cardOperation.log("Data sent to server");
            return true;
        }
    }
    else {
        Serial.println("Wifi not connected when trying to send data");
    }
    return false;
}

void WiFiConnection::getTime()
{
    const char *ntpServer = "pool.ntp.org";
    const long gmtOffset_sec = 0;
    const int daylightOffset_sec = 3600;

    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    struct tm timeinfo;
    
    if (!getLocalTime(&timeinfo))
    {
        cardOperation.log("Failed to obtain time from NTP server");
        timeNow = NO_TIME;
    }
    else {
        char *timeAsCharArray = new char[32]();
        std::strftime(timeAsCharArray, 32, "%Y-%m-%dT%H:%M:%S", &timeinfo);
        timeNow = timeAsCharArray;
        delete timeAsCharArray;
        cardOperation.log("Got time from NTP server");
    }
}

void WiFiConnection::disconnect() {
    if (WiFi.status() == WL_CONNECTED)
    {
        WiFi.disconnect();
        esp_wifi_disconnect();
        delay(100);
        ui.displayWiFiIcon(false);
    }
    esp_wifi_stop();
}