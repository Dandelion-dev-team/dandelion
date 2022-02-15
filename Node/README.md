# Dandelion IoT node

### This branch contains the code for building the IoT node firmware

This code is based on previous work on the [Smart Garden](https://compsust.napier.ac.uk/smart-garden/)

### IDE and microcontroller setup
* Download and install Visual Studio Code - [go](https://code.visualstudio.com/)
* Download and PlatformIO - [go](https://platformio.org/install)
* Download and install device driver - [go](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
* PlatformIO board to select: Espressif Dev Module, framework: Arduino
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
