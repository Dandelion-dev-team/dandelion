#include <MicroSDCardOperations.h>

extern SPIClass SPISD;
extern Utils utils;
extern Display ui;
extern Preferences preferences;
extern String ssid;
extern String pwd;

// perform the actual update from a given stream
void performUpdate(Stream &updateSource, size_t updateSize)
{
    if (Update.begin(updateSize))
    {
        ui.displayMessage("Updating");
        ui.displayMessage("Please wait...", 2);

        size_t written = Update.writeStream(updateSource);
        if (written == updateSize)
        {
            Serial.println("Written : " + String(written) + " successfully");
        }
        else
        {
            Serial.println("Written only : " + String(written) + "/" + String(updateSize) + ". Retry?");
        }
        if (Update.end())
        {
            Serial.println("OTA done!");
            if (Update.isFinished())
            {
                ui.displayMessage("Update successful");
                ui.displayMessage("Rebooting...", 2);
            }
            else
            {
                ui.displayMessage("Update not finished");
                ui.displayMessage("Something went wrong!", 2);
            }
        }
        else
        {
            const char *message = "Error";
            ui.displayMessage(String(Update.getError()).c_str());
        }
    }
    else
    {
        Serial.println("Not enough space to begin OTA");
    }
}

// check for valid dandelion.bin and perform update if available
void MicroSDCardOperations::updateFromSD()
{
    File updateBin = SD.open("/dandelion.bin");
    if (updateBin)
    {
        if (updateBin.isDirectory())
        {
            ui.displayMessage("dandelion.bin invalid", true);
            updateBin.close();
        }
        else 
        {
            size_t updateSize = updateBin.size();

            utils.debug("Size of dandelion.bin: ", false);
            utils.debug((int)updateSize);

            if (updateSize > 0)
            {
                performUpdate(updateBin, updateSize);
            }
            else
            {
                Serial.println("dandelion.bin is empty");
            }

            updateBin.close();

            // when finished remove the binary from sd card to indicate end of the process
            SD.remove("/dandelion.bin");
            ESP.restart();
        }
    }
}

void MicroSDCardOperations::storeJsonOnFile(const String jsonString, const char* fileName)
{
    /*This method is called from either the sendDataToServer() or sendUnsentReadings() methods in the 
    * WiFiConnecion class. In this method, we take in as a parameter the JSON data as a String, and 
    * the name of the file the data is to be written to. The JSON data in its String format is then
    * written to the file.
    */
    delay(500);
    SD.begin(SDCARD_CS, SPISD);
    File file = SD.open(fileName, FILE_WRITE);

    if(file)
    {
        file.println(jsonString);
        file.close();
        utils.debug("Readings stored successfully in ", false);
        utils.debug(fileName);
    }
    else
    {
        ui.displayMessage("Error writing to SD card", 1, true);
    }
}

std::vector<String> MicroSDCardOperations::getUnsentReadings()
{
    /*This method is called from the WifiConnection class before the latest readings are attempted to be sent to the server.
    * The method checks if the unsent.txt file exists, and if so, reads in all the data from it. Each JSON string is read in
    * from the file, deserialised back into to a DynamicJsonDocument, and then sent to the appropriate method in the WifiConnection class so it can be sent. 
    * The reason they are formatted back to a true JSON object again is to ensure the integrity. 
    * If just sending the String straight from file, the closing curly brace is missing due to the way in which each individual
    * Json string is read in. At the end of the method, after all the unsent readings have been dealt with, the file is deleted since 
    * there are no more unsent readings that require to be sent.
    */
    delay(500);
    SD.begin(SDCARD_CS, SPISD);
    std::vector<String> unsent = {};
    if (SD.exists("/unsent.txt"))
    {
        File file = SD.open("/unsent.txt");
        String readings;

        while(file.available())
        {
            readings = file.readStringUntil('\n');
            unsent.push_back(readings);
        }
        file.close();
    }

    return unsent;
}

void MicroSDCardOperations::deleteUnsentFile() {
    if (SD.exists("/unsent.txt"))
    {
        SD.remove("/unsent.txt");
    }
}

// DynamicJsonDocument MicroSDCardOperations::getConfigData()
// {
//     /*In this method, the config file is read in from the MicroSD card. It is stored as a String on file
//     * so after it has been read in, it is converted back to being a true JSON object and returned from the method
//     * back to main.cpp where this method was called from.
//     * If wifi credntials are included in the file, they are stored in EEPROM using the Preferences library
//     * and the values in the config file are replaced with the string "SECURE".
//     */
//     DynamicJsonDocument configData(400); // the Json doc that will be passed back to main

//     delay(500);
//     SD.begin(SDCARD_CS, SPISD);
//     if (SD.exists("/config.txt"))
//     {
//         File file = SD.open("/config.txt");
//         String data; // used to store the String read in from the config file on MicroSD card
//         String buffer; // used to store one line at a time fromm the file
//         data = "";
//         while (file.available()) {
//             buffer = file.readStringUntil('\n');
//             buffer.trim();
//             buffer.replace(": ", ":");
//             data.concat(buffer);
//         }
//         file.close();
//         deserializeJson(configData, data);

//         // Store the actual wifi credentials in the configData for operational use
//         configData = getWifiDetailsFromEeprom(configData);

//     }
//     else {
//         configData["wifi"]["ssid"] = "Your SSID here";
//         configData["wifi"]["password"] = "Your WiFi password here";
//         configData["wifi"]["mac"] = WiFi.macAddress();
//         configData["id"] = 0;
//         configData["server"]["address"] = "dandelion.sruc.ac.uk";
//         configData["server"]["port"] = "80";
//         configData["ph"]["slope"] = 1;
//         configData["ph"]["offset"] = 0;
//         configData["ec"]["slope"] = 1;
//         configData["ec"]["offset"] = 0;
//         configData["moisture"]["slope"] = 1;
//         configData["moisture"]["offset"] = 0;
//         configData["water"]["slope"] = 1;
//         configData["water"]["offset"] = 0;

//         writeConfig(configData);

//         utils.debug("config.txt created");
//     }

//     return configData;
// }

// void MicroSDCardOperations::writeConfig(DynamicJsonDocument data) {

//     if (SD.exists("/config.txt")) {
//         utils.debug("Removing old config");
//         SD.remove("/config.txt");
//     }
//     File file = SD.open("/config.txt", FILE_WRITE);
//     serializeJsonPretty(data, file);
//     file.close();
// }

// DynamicJsonDocument MicroSDCardOperations::setWifiDetails(DynamicJsonDocument data, const char *p_ssid, const char *p_pwd)
// {
//     data["wifi"]["ssid"] = p_ssid;
//     data["wifi"]["password"] = p_pwd;

//     return data;
// }

// DynamicJsonDocument MicroSDCardOperations::storeWifiDetailsInEeprom(DynamicJsonDocument data)
// {
//     ssid = String((const char *)data["wifi"]["ssid"]);
//     pwd = String((const char *)data["wifi"]["password"]);

//     preferences.begin("dandelion", false); // Use "dandelion" namespace
//     preferences.clear();
//     preferences.putString("ssid", ssid);
//     preferences.putString("pwd", pwd);
//     preferences.end();

//     data = setWifiDetails(data, "SECURE", "SECURE");

//     return data;
// }

// DynamicJsonDocument MicroSDCardOperations::getWifiDetailsFromEeprom(DynamicJsonDocument data)
// {
//     preferences.begin("dandelion", false); // Use "dandelion" namespace

//     ssid = preferences.getString("ssid", "NOT SET");
//     pwd = preferences.getString("pwd", "NOT SET");

//     preferences.end();

//     data = setWifiDetails(data, ssid.c_str(), pwd.c_str()); // Keep the actual values in configDoc for operational use

//     return data;
// }

// void MicroSDCardOperations::putConfig(String key, const char *value)
// {
//     /* This method is used to store a string value in the config file.
//         * The parameters define a key-value pair. If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, const int value)
// {
//     /* This method is used to store an int value in the config file.
//         * The parameters define a key-value pair. If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, const float value)
// {
//     /* This method is used to store a float value in the config file.
//         * The parameters define a key-value pair. If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, const bool value)
// {
//     /* This method is used to store a boolean value in the config file.
//         * The parameters define a key-value pair. If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, String member, const char *value)
// {
//     /* This method is used to store a value in the config file as an element of a nested object
//         * If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key][member] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, String member, const int value)
// {
//     /* This method is used to store a value in the config file as an element of a nested object
//         * If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key][member] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, String member, const float value)
// {
//     /* This method is used to store a value in the config file as an element of a nested object
//         * If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key][member] = value;
//     writeConfig(configData);
// }

// void MicroSDCardOperations::putConfig(String key, String member, const bool value)
// {
//     /* This method is used to store a value in the config file as an element of a nested object
//         * If the key exists, the value is updated.
//         * If the key does not exist, it is added.
//         */

//     DynamicJsonDocument configData(400);

//     configData = getConfigData();
//     configData[key][member] = value;
//     writeConfig(configData);
// }
