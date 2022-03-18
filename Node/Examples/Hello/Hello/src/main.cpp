#define LILYGO_T5_V213
#define uS_TO_S_FACTOR 1000000 // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 10        // Time ESP32 will go to sleep (in seconds)

#include <Arduino.h>

const int buttonPin = 39;
volatile int buttonCount = 0;
volatile unsigned long last_millis;
char message_buffer[100];
int sleep_countdown = 5;
int retval = 0;

void catchButton();
void print_wakeup_reason();

void setup(void)
{
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLDOWN);
  attachInterrupt(buttonPin, catchButton, RISING);

  print_wakeup_reason();

  delay(2000);
  while (sleep_countdown > 0) {
    sprintf(message_buffer, "Going to sleep in %d", sleep_countdown--);
    Serial.println(message_buffer);
    delay(1000);
    if (buttonCount > 0) {
      Serial.println("Button press detected!");
      buttonCount = 0;
      sleep_countdown = 5;
    }
  }

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_deep_sleep_start();
}

void loop()
{ }

void catchButton()
{
  if ((long)(millis() - last_millis) >= 200)
  {
    buttonCount++;
    last_millis = millis();
  }
}

// Function that prints the reason by which ESP32 has been awaken from sleep
void print_wakeup_reason()
{
  esp_sleep_wakeup_cause_t wakeup_reason;
  uint64_t wakeup_cause;

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
    Serial.println("Wakeup was not caused by deep sleep");
    break;
  }
}