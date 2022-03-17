#include <DataTransformation.h>

WiFiConnection wiFiOperation;

using namespace std; //needed otherwise a double scope resolution operator is required within the iterator definition.

void DataTransformation::serialise(std::map <String, float> p_readings)
{
    /*In this method, the map that has been built in the SensorModule class is pass as a parameter,
    * with the map then converted to JSON. An Iterator object is used to iterate through each of the key-value pairs
    * in the map. Once each pair has been added to the JSON doc, the doc is passed as an argument to the 
    * relevant method in the WiFiConnection to begin the process of sending the readings to the database.
    */
    DynamicJsonDocument doc(256);
    std::map<String, float>::iterator itr;

    for (itr = p_readings.begin(); itr != p_readings.end(); ++itr)
    {
        /*When adding the readings to the doc, as opposed to setting the value directly as itr->second, it is wrapped in a
        * call to the ArduinoJson serialized() method, as this provides a way for the reading to be set to the required 3 
        * decimal places. This is what the '3' argument in the method call relates to.
        */
        doc[itr->first] = serialized(String(itr->second, 3));
    }

    wiFiOperation.sendDataToServer(doc);
}