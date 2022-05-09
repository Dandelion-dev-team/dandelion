#include <DataTransformation.h>

extern Utils utils;

WiFiConnection wiFiOperation;

uint8_t pad_pkcs7(char *msg, char *padded)
{
    uint16_t input_len = strlen(msg);
    Serial.print("message length:");
    Serial.println(input_len);

    uint8_t padchar = BLOCKSIZE - (input_len % BLOCKSIZE);
    uint16_t padlength = input_len + padchar;

    Serial.print("msg: ");
    Serial.println(msg);
    Serial.print("message length:");
    Serial.println(input_len);
    Serial.print("padding length:");
    Serial.println(padchar);

    if (padlength <= MAXMESSAGESIZE)
    {
        for (uint16_t i = 0; i < input_len; i++)
        {
            padded[i] = msg[i];
        }
        for (uint16_t i = input_len; i < padlength; i++)
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


    // serializeJson(json_data, input);     // convert from JSON to character array.

    uint16_t padlength = pad_pkcs7((char *)input, (char *)buffer);

    utils.debug("padlength = ", false);
    utils.debug(String(padlength));

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

    return (uint16_t)base64_length;
}
