#include <EventDrivenButtonPress.h>
#include <definitions.h>

volatile int buttonCount = 0;
volatile unsigned long last_millis;

void catchButton();
void print_wakeup_reason();

void EventDrivenButtonPress::initialise()
{
    pinMode(BUTTONPIN, INPUT_PULLDOWN);
    attachInterrupt(BUTTONPIN, catchButton, RISING);
    // print_wakeup_reason();
}

void catchButton()
{
    if ((long)(millis() - last_millis) >= 200)
    {
        buttonCount++;
        last_millis = millis();
    }
}

void print_wakeup_reason()
{
  esp_sleep_wakeup_cause_t wakeup_reason;
  uint64_t wakeup_cause;
  Display display; //used to update display to trigger User Interaction state.

  wakeup_reason = esp_sleep_get_wakeup_cause();
  switch (wakeup_reason)
  {
  case 2:
    Serial.println("Wakeup caused by external signal using RTC_IO");
    break;
  case 3:
    Serial.println("Wakeup caused by external signal using RTC_CNTL");
    break;
  case 4:
    Serial.println("Wakeup caused by timer");
    break;
  case 5:
    Serial.println("Wakeup caused by touchpad");
    break;
  case 6:
    Serial.println("Wakeup caused by ULP program");
    break;
  default:
    Serial.println("Wakeup was not caused by deep sleep, entering user interaction mode");
    display.enterUserInteractionMode(); //enter UI state.
    break;
  }
}