#include "Button2.h"
#include <Arduino.h>

#define BUTTON_1 39

Button2 btn1(BUTTON_1);

void buttonPressed1(Button2 &b)
{
Serial.println("1");
}

void setup() {
Serial.begin(115200);
delay(50);
Serial.println("Button Demo");
btn1.setPressedHandler(buttonPressed1);
}

void loop() {
btn1.loop();
}