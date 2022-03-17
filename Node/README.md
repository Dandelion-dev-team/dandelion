# Dandelion IoT node

### This branch contains the code for building the IoT node firmware

This code is based on previous work on the [Smart Garden](https://compsust.napier.ac.uk/smart-garden/)

### IDE and microcontroller setup
* Download and install Visual Studio Code - [go](https://code.visualstudio.com/)
* Download and PlatformIO - [go](https://platformio.org/install)
* Download and install device driver - [go](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
* PlatformIO board to select: Espressif ESP32 Dev Module, framework to select: Arduino Framework
* [This](https://www.re-innovation.co.uk/docs/ttgo-e-paper-display/) site provides additional info on the process as well as links to further useful resources.


### Firmware library guide
Note: all libraries are installed via the Libraries search within PlatformIO unless otherwise stated.
##### Adafruit GFX Library
__by__: Adafruit  
__version__: 1.9.0  
__purpose__: Interface with e-paper display.  
__issues__: Yes, causes error during compliation. Error is related to Adafruit_MonoOLED.cpp file.  
__fixes__: Option 1: Open this .cpp file* in a text editor and comment the entire code. Option 2: Delete Adafruit_MonoOLED.cpp and Adafruit_MonoOLED.h files*.  
_*file location in Windows Explorer window: Documents/PlatformIO/Projects/*projectName*/.pio/libdeps/esp32dev/Adafruit GFX Library_

##### U8g2_for_Adafruit_GFX
__by__: oliver  
__version__: 1.8.0  
__purpose__: Displaying custom images on e-paper display.  
__issues__: None.  
__fixes__: n/a.

##### GxEPD-master
__sourced from__: https://github.com/lewisxhe/GxEPD. After downloading the library, unzip to Documents/PlatformIO/Projects/*projectName*/lib.  
__by__: lewisxhe  
__version__: 3.1.0  
__purpose__: Interface with e-paper display.  
__issues__: Yes, causes error during compilation. Error is related to function called "getUTF8width".  
__fixes__: Comment out both mentions of getUTF8Width() in both the GxFont_GFX.cpp and GxFont_GFX.h files. There should be two instances in each file to comment.

##### Button2
__by__: Lennart Hennigs  
__version__: 1.6.2  
__purpose__: Interface with T5's programmable button. Allows for regular, double, triple, and long press to be interpreted.  
__issues__: None.  
__fixes__: n/a

#### mySD
__sourced from__: https://github.com/nhatuan84/esp32-micro-sdcard. After downloading the library, unzip to Documents/PlatformIO/Projects/*projectName*/lib.  
__by__: nhatuan84  
__version__: Last updated 26 March 2020  
__purpose__: Interact with the T5's MicroSD card.  
__issues__: None. But when uploading firmware to the T5, it's best to ensure the SD card is __not__ inserted into the module.  
__fixes__: n/a

#### ArduinoJSON
__by__: Benoit Blanchon  
__version__:  6.19.0  
__purpose__: Used as a means of serialising sensor readings to Json.  
__issues__: None.
__fixes__: n/a

#### Adafruit_BME_280_Library
__by__: Adafruit  
__version__: 2.2.2  
__purpose__: Interface with BME280 sensor.  
__issues__: None.  
__fixes__: n/a

#### Adafruit_TSL2591_Library
__by__: Adafruit  
__version__: 1.4.2  
__purpose__: Interface with TSL2591 sensor.  
__issues__: None.  
__fixes__: n/a

#### Adafruit Unified Sensor
__by__: Adafruit  
__version__: 1.1.4  
__purpose__: Required for all Adafruit libraries.  
__issues__: None.  
__fixes__: n/a

#### Adafruit BusIO
__by__: Adafruit  
__version__: 1.11.1  
__purpose__: UART, I2C and SPI interfacing.  
__issues__: None.  
__fixes__:  n/a

#### OneWire
__by__: Paul Stoffregen  
__version__:2.3.6  
__purpose__: Interface with DS18B20 sensor  
__issues__: None.  
__fixes__: n/a

#### DallasTemperature
__by__: Miles Burton  
__version__: 3.9.1  
__purpose__: Interface with DS18B20 sensor  
__issues__: None.
__fixes__: n/a

#### DFRobot_PH
__sourced from__: https://github.com/DFRobot/DFRobot_PH. After downloading the library, unzip to Documents/PlatformIO/Projects/*projectName*/lib.    
__by__: DFRobot  
__version__: Last updated 22 February 2022  
__purpose__: Interface with pH sensor.
__issues__: Yes, must make alteration to the begin() method in the DFRobot_PH.cpp file.  
__fixes__: Details of the fix can be seen in the version of the file currently in the repo, where the original version is commented out and updated version is below.
