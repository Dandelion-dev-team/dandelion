#include <EventDrivenButtonPress.h>
#include <definitions.h>

<<<<<<< Updated upstream
volatile int buttonCount = 0;
=======
extern uint8_t buttonCount;
>>>>>>> Stashed changes
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
