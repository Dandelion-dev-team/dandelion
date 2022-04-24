#include <DataTransformation.h>

extern Utils utils;

WiFiConnection wiFiOperation;

using namespace std; //needed otherwise a double scope resolution operator is required within the iterator definition.

DynamicJsonDocument DataTransformation::serialise(std::map<String, float> p_readings)
{
    /*In this method, the map that has been built in the SensorModule class is passed as a parameter,
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

    // utils.debug("Attempting to send data");
    
    return doc;
    // wiFiOperation.sendDataToServer(doc);
}

uint8_t pad_pkcs7(char *msg, char *padded)
{
    uint8_t input_len = strlen(msg);
    uint8_t padchar = BLOCKSIZE - (input_len % BLOCKSIZE);
    uint16_t padlength = input_len + padchar;

    if (padlength <= MAXMESSAGESIZE)
    {
        for (uint8_t i = 0; i < input_len; i++)
        {
            padded[i] = msg[i];
        }
        for (uint8_t i = input_len; i < padlength; i++)
        {
            padded[i] = padchar;
        }
        return padlength;
    }
    else
    {
        Serial.println("Padding: MAXMESSAGESIZE exceeded");
        return 0;
    }
}

void gen_iv(uint8_t *iv, size_t size)
{
    srand(time(NULL));
    for (uint8_t i = 0; i < size; i++)
    {
        iv[i] = rand() % 0x70 + 16;
    }
}

uint16_t DataTransformation::encrypt(unsigned char input[], unsigned char msg[])
{
    unsigned char buffer[MAXMESSAGESIZE];
    // unsigned char input[MAXMESSAGESIZE]; // used to store converted JSON object in.
    uint8_t initial_iv[BLOCKSIZE] = {0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70};
    uint8_t iv[BLOCKSIZE] = {0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70};
    size_t input_length = 0;
    size_t base64_length = 0;
    String b64text;


    Serial.println("input: ");
    Serial.println((char *)input);
    Serial.println("Wot no input?");
    // serializeJson(json_data, input);     // convert from JSON to character array.

    uint16_t padlength = pad_pkcs7((char *)input, (char *)buffer);

    if (padlength > 0)
    {
        gen_iv(initial_iv, BLOCKSIZE);
        memcpy(iv, initial_iv, BLOCKSIZE);

        AES128.runEnc((uint8_t *)KEY, BLOCKSIZE, buffer, padlength, iv);

        memcpy(input, initial_iv, BLOCKSIZE);
        memcpy(&input[BLOCKSIZE], buffer, padlength);

        input_length = padlength + BLOCKSIZE;

        mbedtls_base64_encode(NULL, 0, &base64_length, input, input_length);
        unsigned char b64_cipher[base64_length];
        mbedtls_base64_encode(b64_cipher, base64_length, &base64_length, input, input_length);
        b64_cipher[base64_length] = '\0';
        memcpy(msg, b64_cipher, base64_length + 1);
    }

    Serial.println("msg: ");
    Serial.println((char *)msg);

    return (uint16_t)base64_length;
}
