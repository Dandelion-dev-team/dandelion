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

void linearCalibration(WiFiClient client, char *cubeLevel, float slopeValue, float offsetValue)
{
    client.print("<tr><td>");
    client.print(cubeLevel);
    client.println("</td><td>");
    client.print(slopeValue, 4);
    client.println("</td><td>");
    client.print(offsetValue, 4);
    client.println("</td></tr>");
}

void polyCalibration(WiFiClient client, char *cubeLevel, float c0, float c1, float c2)
{
    client.print("<tr><td>");
    client.print(cubeLevel);
    client.println("</td><td>");
    client.print(c0, 6);
    client.println("</td><td>");
    client.print(c1, 6);
    client.println("</td><td>");
    client.print(c2, 6);
    client.println("</td></tr>");
}

void probeSeq(WiFiClient client, char *cubeLevel, uint8_t seq)
{
    client.print("<tr><td>");
    client.print(cubeLevel);
    client.println("</td><td>");
    client.print(seq);
    client.println("</td></tr>");
}

void HttpServer::status(WiFiClient client)
{
    // Node details
    String npwd = utils.getFromPreferences("npwd");
    String ssid = utils.getFromPreferences("ssid");
    String pwd = utils.getFromPreferences("pwd");
    String version = String(VERSION).c_str();
    String mac  = WiFi.macAddress();
    String nowTime = utils.getSystemTime();

    // Calibrations
    float echc = utils.getFromPreferences("echc", (float)ECHC);
    float echx = utils.getFromPreferences("echx", (float)ECHX);
    float echx2 = utils.getFromPreferences("echx2", (float)ECHX2);
    float ectc = utils.getFromPreferences("ectc", (float)ECTC);
    float ectx = utils.getFromPreferences("ectx", (float)ECTX);
    float ectx2 = utils.getFromPreferences("ectx2", (float)ECTX2);
    float ecmc = utils.getFromPreferences("ecmc", (float)ECMC);
    float ecmx = utils.getFromPreferences("ecmx", (float)ECMX);
    float ecmx2 = utils.getFromPreferences("ecmx2", (float)ECMX2);
    float ecbc = utils.getFromPreferences("ecbc", (float)ECBC);
    float ecbx = utils.getFromPreferences("ecbx", (float)ECBX);
    float ecbx2 = utils.getFromPreferences("ecbx2", (float)ECBX2);

    float phts = utils.getFromPreferences("phts", (float)PHTS);
    float phto = utils.getFromPreferences("phto", (float)PHTO);
    float phms = utils.getFromPreferences("phms", (float)PHMS);
    float phmo = utils.getFromPreferences("phmo", (float)PHMO);
    float phbs = utils.getFromPreferences("phbs", (float)PHBS);
    float phbo = utils.getFromPreferences("phbo", (float)PHBO);

    uint8_t sttseq = utils.getFromPreferences("sttseq", (uint8_t)99);
    uint8_t stmseq = utils.getFromPreferences("stmseq", (uint8_t)99);
    uint8_t stbseq = utils.getFromPreferences("stbseq", (uint8_t)99);

    client.println("<div><h2>Details</h2><table>");
    readOnlyDetails(client, "Software version", version);
    readOnlyDetails(client, "MAC address", mac);
    detailsForm(client, "Node password", "npwd", npwd);
    detailsForm(client, "Wifi network", "ssid", ssid);
    detailsForm(client, "Wifi password", "pwd", pwd);
    detailsForm(client, "Date and time", "nowTime", nowTime);
    client.println("</table></div>");
    
    client.println("<br><div><h2>pH calibrations</h2>");
    client.println("<table><tr><th>Cube level</th><th>Slope</th><th>Offset</th></tr>");
    linearCalibration(client, "Top", phts, phto);
    linearCalibration(client, "Middle", phms, phmo);
    linearCalibration(client, "Bottom", phbs, phbo);
    client.println("</table></div>");

    client.println("<br><div><h2>EC calibrations</h2>");
    client.println("<table><tr><th>Cube level</th><th>C0</th><th>C1</th><th>C2</th></tr>");
    polyCalibration(client, "Top (high)", echc, echx, echx2);
    polyCalibration(client, "Top", ectc, ectx, ectx2);
    polyCalibration(client, "Middle", ecmc, ecmx, ecmx2);
    polyCalibration(client, "Bottom", ecbc, ecbx, ecbx2);
    client.println("</table></div>");

    client.println("<br><div><h2>Temperature probes</h2>");
    client.println("<table><tr><th>Cube level</th><th>Sequence</th></tr>");
    probeSeq(client, "Top", sttseq);
    probeSeq(client, "Middle", stmseq);
    probeSeq(client, "Bottom", stbseq);
    client.println("</table></div>");
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
    ui.displayText(timeNow.c_str(), ui.boxes[1]);
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