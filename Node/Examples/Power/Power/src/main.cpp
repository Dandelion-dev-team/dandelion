#define LILYGO_T5_V213
#define uS_TO_S_FACTOR 1000000 // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP 10        // Time ESP32 will go to sleep (in seconds)

#define LEVEL_1_SELECT 0
#define LEVEL_2_SELECT 12
#define LEVEL_3_SELECT 27
#define SET_1_SELECT 26
#define SET_2_SELECT 25
#define SET_3_SELECT 33
// #define SCL 22
// #define SDA 21
#define DATA1 36
#define DATA2 19
#define ANALOGUE 32
#define BUTTONPIN 39

#include <Arduino.h>

volatile int buttonCount = 0;
volatile unsigned long last_millis;
char message_buffer[100];
int sleep_countdown = 5;
int retval = 0;

void catchButton();
void print_wakeup_reason();
void initialise_pins();
void select(int level_select, int set_select);

void setup(void)
{
  Serial.begin(115200);
  pinMode(BUTTONPIN, INPUT_PULLDOWN);
  pinMode(LEVEL_1_SELECT, OUTPUT);
  pinMode(LEVEL_2_SELECT, OUTPUT);
  pinMode(LEVEL_3_SELECT, OUTPUT);
  pinMode(SET_1_SELECT, OUTPUT);
  pinMode(SET_2_SELECT, OUTPUT);
  pinMode(SET_3_SELECT, OUTPUT);

  // pinMode(SCL, INPUT);
  // pinMode(SDA, INPUT);
  pinMode(DATA1, INPUT);
  pinMode(DATA2, INPUT);
  pinMode(ANALOGUE, INPUT);

  attachInterrupt(BUTTONPIN, catchButton, RISING);
  print_wakeup_reason();

  select(LEVEL_1_SELECT, SET_1_SELECT);
  // read light
  // read pressure
  // read water level
  // read EC
  delay(2000);
  select(LEVEL_1_SELECT, SET_2_SELECT);
  // read temperature
  // read humidity
  // read moisture
  // read substrate temperature
  delay(2000);
  select(LEVEL_1_SELECT, SET_3_SELECT);
  // read pH
  delay(2000);
  select(LEVEL_2_SELECT, SET_1_SELECT);
  delay(2000);
  select(LEVEL_2_SELECT, SET_2_SELECT);
  delay(2000);
  select(LEVEL_2_SELECT, SET_3_SELECT);
  delay(2000);
  select(LEVEL_3_SELECT, SET_1_SELECT);
  delay(2000);
  select(LEVEL_3_SELECT, SET_2_SELECT);
  delay(2000);
  select(LEVEL_3_SELECT, SET_3_SELECT);
  delay(2000);

  while (sleep_countdown > 0)
  {
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

void initialise_pins() {
  digitalWrite(LEVEL_1_SELECT, LOW);
  digitalWrite(LEVEL_2_SELECT, LOW);
  digitalWrite(LEVEL_3_SELECT, LOW);
  digitalWrite(SET_1_SELECT, LOW);
  digitalWrite(SET_2_SELECT, LOW);
  digitalWrite(SET_3_SELECT, LOW);
}

void select(int level_select, int set_select) {
  initialise_pins();
  digitalWrite(level_select, HIGH);
  digitalWrite(set_select, HIGH);
  sprintf(message_buffer, "Level %d, Set %d", level_select, set_select);
  Serial.println(message_buffer);
}