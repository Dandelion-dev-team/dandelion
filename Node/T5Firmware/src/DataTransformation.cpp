#include <DataTransformation.h>

extern Utils utils;
extern MicroSDCardOperations cardOperation;

WiFiConnection wiFiOperation;

uint16_t pad_pkcs7(char *msg, char *padded)
{
    uint16_t input_len = strlen(msg);
    uint8_t padchar = BLOCKSIZE - (input_len % BLOCKSIZE);
    uint16_t padlength = input_len + padchar;

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
        cardOperation.log("Padding: MAXMESSAGESIZE exceeded");
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
    unsigned char padded[MAXMESSAGESIZE];
    uint8_t initial_iv[BLOCKSIZE] = {0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70};
    uint8_t iv[BLOCKSIZE] = {0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70};
    size_t bufferLength = 0;
    size_t base64Length = 0;
    String b64text;

    uint16_t padlength = pad_pkcs7((char *)input, (char *)padded);

    if (padlength > 0)
    {
        bufferLength = padlength + BLOCKSIZE;
        unsigned char buffer[bufferLength];

        gen_iv(initial_iv, BLOCKSIZE);
        memcpy(iv, initial_iv, BLOCKSIZE);

        AES128.runEnc((uint8_t *)KEY, BLOCKSIZE, padded, padlength, iv);

        memcpy(buffer, initial_iv, BLOCKSIZE);
        memcpy(&buffer[BLOCKSIZE], padded, padlength);

        mbedtls_base64_encode(NULL, 0, &base64Length, buffer, bufferLength); // Just finding the value of base64Length
        mbedtls_base64_encode(msg, base64Length, &base64Length, buffer, bufferLength);
        msg[base64Length] = '\0';
    }

    return (uint16_t)base64Length;
}
