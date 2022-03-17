#include <DataTransformation.h>

WifiConnection wifiOperation;

using namespace std; //needed otherwise a double scope operator is required within the iterator definition.

void DataTransformation::serialise(std::map <String, float> p_readings)
{
    DynamicJsonDocument doc(256);
    std::map<String, float>::iterator itr;

    for (itr = p_readings.begin(); itr != p_readings.end(); ++itr)
    {
        doc[itr->first] = serialized(String(itr->second, 3));
    }

    // cardOperation.storeJsonOnFile(doc); //we used to store on SD card and then send to WiFi, but this now happens the other way around to allow unsent readings to be dealt with.
    wifiOperation.sendDataToServer(doc);
}