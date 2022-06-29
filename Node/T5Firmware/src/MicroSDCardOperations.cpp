#include <MicroSDCardOperations.h>

extern SPIClass SPISD;
extern Utils utils;
extern Display ui;
extern Preferences preferences;
extern String ssid;
extern String pwd;
extern int logseq;
extern String timeNow;
extern MicroSDCardOperations cardOperation;


void MicroSDCardOperations::log(const char *message, const char *extra)
{
    char filename[20];
    strcpy(filename, "/logs");

    if (SD.begin(SDCARD_CS, SPISD))
    {
        File directory = SD.open(filename);
        if (!directory)
            SD.mkdir(filename);
        else
            directory.close();

        char logSequence[10];
        itoa(logseq, logSequence, 10);

        strcat(filename, "/");
        strcat(filename, logSequence);
        strcat(filename, ".txt");

        char entry[256];
        if (timeNow.length() > 0)
            strcpy(entry, timeNow.c_str());
        else
            strcpy(entry, NO_TIME);
        strcat(entry, ": ");
        strcat(entry, message);
        strcat(entry, " ");
        strcat(entry, extra);

        MicroSDCardOperations::appendToFile(entry, filename);
        Serial.println(entry);
    }
    else
    {
        ui.displayText("Log write error", ui.boxes[1], true);
    }
} 

void performUpdate(Stream &updateSource, size_t updateSize)
{
    if (Update.begin(updateSize))
    {
        ui.displayText("Updating", ui.boxes[1]);
        ui.displayText("Please wait...", ui.boxes[2]);

        size_t written = Update.writeStream(updateSource);
        if (written != updateSize)
        {
            ui.displayText("Upgrade incomplete", ui.boxes[1], true);
            ui.displayText("Please try again", ui.boxes[2]);
        }
        if (Update.end())
        {
            if (Update.isFinished())
            {
                ui.displayText("Update successful", ui.boxes[1]);
                ui.displayText("Rebooting...", ui.boxes[2]);
            }
            else
            {
                ui.displayText("Update failed", ui.boxes[1]);
                ui.displayText("Please try again", ui.boxes[2]);
            }
        }
        else
        {
            ui.displayText("", ui.boxes[2]);
            ui.displayText(String(Update.getError()).c_str(), ui.boxes[1]);
        }
    }
    else
    {
        cardOperation.log("Not enough space to begin OTA");
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
            ui.displayText("dandelion.bin invalid", ui.boxes[1], true);
            updateBin.close();
        }
        else 
        {
            size_t updateSize = updateBin.size();

            Serial.print("Size of dandelion.bin: ");
            Serial.println(updateSize);

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

void MicroSDCardOperations::appendToFile(const String stringToAdd, const char* fileName)
{
    /* This method appends the string parameter to the named file
    */
    delay(500);
    SD.begin(SDCARD_CS, SPISD);
    File file = SD.open(fileName, FILE_APPEND);

    if(file)
    {
        file.println(stringToAdd);
        file.close();
    }
    else
    {
        ui.displayText("Error writing to SD card", ui.boxes[1], true);
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
