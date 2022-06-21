#include <httpServer.h>

extern WiFiServer server;
extern Display ui;
extern Preferences preferences;
extern Utils utils;
extern MicroSDCardOperations cardOperation;

// Variable to store the HTTP request
String requestText;

void header(WiFiClient client) 
{
    // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
    // and a content-type so the client knows what's coming, then a blank line:
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/html");
    client.println("Connection: close");
    client.println();
}

void head(WiFiClient client)
{
    client.println("<!DOCTYPE html><html>");
    client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
    client.println("<link rel=\"icon\" href=\"data:,\">");
    client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;background: #2e5641;}");
    client.println("div {background: #ffffff; padding: 10px; display: inline-block; margin: 20px; border-radius: 20px;}");
    client.println("input[type=\"submit\"] {background: #f8f448; border: none; border-radius: 5px; height: 25px; cursor: pointer;}");
    client.println(".dirty {background: #fae3e3;}");
    client.println("</style>");
    client.println("<script>function pink(f) {f.classList.add(\"dirty\");}</script>");
    client.println("</head>");
}

void detailsForm(WiFiClient client, char *text, char *key, String value)
{
    client.print("<tr><td>");
    client.print(text);
    client.println("</td><td><form method=\"GET\" action=\"set\">");
    client.print("<input type=\"text\" id=\"");
    client.print(key);
    client.print("\" name=\"");
    client.print(key);
    client.print("\" onChange=\"pink(this)\" value=\"");
    client.print(value);
    client.println("\" />");
    client.println("<input type=\"submit\" value=\"Save\"></form></td><td></tr>");
}

void readOnlyDetails(WiFiClient client, char *text, String value)
{
    client.print("<tr><td>");
    client.print(text);
    client.println("</td><td colspan=2>");
    client.print(value);
    client.println("</td><td></tr>");
}

void calibration(WiFiClient client, char *text, char *cubeLevel, char *slope, char *offset, float slopeValue, float offsetValue)
{
    client.print("<tr><td>");
    client.print(text);
    client.print("</td><td>");
    client.print(cubeLevel);
    client.println("</td><td>");
    client.print("<input name=\"");
    client.print(slope);
    client.print("\" type=\"text\" size=6 onChange=\"pink(this)\" value=");
    client.print(slopeValue);
    client.println("/></td><td>");
    client.print("<input name=\"");
    client.print(offset);
    client.print("\" type=\"text\" onChange=\"pink(this)\" size=6 value=");
    client.print(offsetValue);
    client.println("/></td></tr>");
}

void HttpServer::status(WiFiClient client)
{
    preferences.begin("dandelion", false);
    // Node details
    String npwd = preferences.getString("npwd", "NOT SET");
    String ssid = preferences.getString("ssid", "NOT SET");
    String pwd = preferences.getString("pwd", "NOT SET");
    String version = preferences.getString("version", "NOT SET");
    String mac  = WiFi.macAddress();
    String nowTime = utils.getSystemTime();

    // Calibrations
    // float ects = preferences.getFloat("ects", 1.0);
    // float ecto = preferences.getFloat("ecto", 0.0);
    // float ecms = preferences.getFloat("ecms", 1.0);
    // float ecmo = preferences.getFloat("ecmo", 0.0);
    // float ecbs = preferences.getFloat("ecbs", 1.0);
    // float ecbo = preferences.getFloat("ecbo", 0.0);
    // float phts = preferences.getFloat("phts", 1.0);
    // float phto = preferences.getFloat("phto", 0.0);
    // float phms = preferences.getFloat("phms", 1.0);
    // float phmo = preferences.getFloat("phmo", 0.0);
    // float phbs = preferences.getFloat("phbs", 1.0);
    // float phbo = preferences.getFloat("phbo", 0.0);
    // float mts = preferences.getFloat("mts", 1.0);
    // float mto = preferences.getFloat("mto", 0.0);
    // float mms = preferences.getFloat("mms", 1.0);
    // float mmo = preferences.getFloat("mmo", 0.0);
    // float mbs = preferences.getFloat("mbs", 1.0);
    // float mbo = preferences.getFloat("mbo", 0.0);
    preferences.end();

    client.println("<div><h2>Details</h2><table>");
    readOnlyDetails(client, "Software version", version);
    readOnlyDetails(client, "MAC address", mac);
    detailsForm(client, "Node password", "npwd", npwd);
    detailsForm(client, "Wifi network", "ssid", ssid);
    detailsForm(client, "Wifi password", "pwd", pwd);
    detailsForm(client, "Date and time", "nowTime", nowTime);
    client.println("</table></div>");
    // client.println("<br><div><h2>Calibrations</h2>");
    // client.println("<form name=\"calibrations\" method=\"GET\" action=\"saveCalibrations\"><table>");
    // client.println("<tr><th>Sensor</th><th>Cube level</th><th>Slope</th><th>Offset</th></tr>");
    // calibration(client, "Elecrical conductivity", "Top", "ects", "ecto", ects, ecto);
    // calibration(client, "Elecrical conductivity", "Middle", "ecms", "ecmo", ecms, ecmo);
    // calibration(client, "Elecrical conductivity", "Bottom", "ecbs", "ecbo", ecbs, ecbo);
    // calibration(client, "pH", "Top", "phts", "phto", phts, phto);
    // calibration(client, "pH", "Middle", "phms", "phmo", phms, phmo);
    // calibration(client, "pH", "Bottom", "phbs", "phbo", phbs, phbo);
    // calibration(client, "Moisture", "Top", "mts", "mto", mts, mto);
    // calibration(client, "Moisture", "Middle", "mms", "mmo", mms, mmo);
    // calibration(client, "Moisture", "Bottom", "mbs", "mbo", mbs, mbo);
    // client.println("</table><input type=\"submit\" value=\"Save\"></form></div>");
}

void foot(WiFiClient client) 
{
    client.println("</body></html>");
    client.println();
}

String getQueryString(String requestText)
{
    uint8_t i = 0;
    String buffer;

    i = requestText.indexOf("?");
    buffer = requestText.substring(i + 1);
    i = buffer.indexOf("HTTP");
    return buffer.substring(0, i - 1);
}

void saveFromRequest(String queryString, char *key)
{
    String value;

    value = queryString.substring(queryString.indexOf("=") + 1);
    value = utils.urldecode(value);
    cardOperation.log("CONFIG: Saved ", key);
    utils.saveToPreferences(key, value);
}

void setTimeFromRequest(String queryString)
{
    String timeString;

    timeString = queryString.substring(queryString.indexOf("=") + 1);
    timeString = utils.urldecode(timeString);

    utils.setSystemTime(utils.stringToDatetime(timeString));

    String timeNow = utils.getSystemTime();
    ui.displayMessage(timeNow.c_str());
}

void HttpServer::handle()
{
    uint8_t i = 0;
    String queryString;
    WiFiClient client = server.available(); // Listen for incoming clients

    if (client)
    {                                  // If a new client connects,
        Serial.println("New Client."); // print a message out in the serial port
        String currentLine = "";       // make a String to hold incoming data from the client
        while (client.connected())
        { // loop while the client's connected
            if (client.available())
            {                           // if there's bytes to read from the client,
                char c = client.read(); // read a byte, then
                Serial.write(c);        // print it out the serial monitor
                requestText += c;
                if (c == '\n')
                { // if the byte is a newline character
                    // if the current line is blank, you got two newline characters in a row.
                    // that's the end of the client HTTP request, so send a response:
                    if (currentLine.length() == 0)
                    {
                        queryString = getQueryString(requestText);

                        Serial.print("Query string: ");
                        Serial.println(queryString.c_str());

                        if (queryString.indexOf("npwd=") == 0)
                            saveFromRequest(queryString, "npwd");

                        if (queryString.indexOf("ssid=") == 0)
                            saveFromRequest(queryString, "ssid");

                        if (queryString.indexOf("pwd=") == 0)
                            saveFromRequest(queryString, "pwd");

                        if (queryString.indexOf("nowTime=") == 0)
                        {
                            setTimeFromRequest(queryString);
                        }

                        header(client);
                        head(client);
                        status(client);
                        foot(client);

                        break;
                    }
                    else
                    { // if you got a newline, then clear currentLine
                        currentLine = "";
                    }
                }
                else if (c != '\r')
                {                     // if you got anything else but a carriage return character,
                    currentLine += c; // add it to the end of the currentLine
                }
            }
        }
        // Clear the requestText variable
        requestText = "";
        // Close the connection
        client.stop();
        Serial.println("Client disconnected.");
        Serial.println("");
    }
}