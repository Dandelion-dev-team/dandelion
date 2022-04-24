#include <SensorSelection.h>
#include "definitions.h"
#include <cstdarg>

extern Utils utils;

void initialise_pins();
using namespace std;
void select(int ...);

SensorModule m_sensor;

void SensorSelection::setAndLevelSelection()
{
  /*In this method, we will go through each of the Levels and sensor Sets within the Grow Cube. When a 
  * level is selected, we call the initialise() method to first turn off power to every level and set,
  * and then turn on power to only the level and set that has been selected. After the last
  * level and set have had their readings taken, the SensorModule class handles the rest of the process from this point.
  */

  select(2, TOP, SET_1);
  delay(2000);
  m_sensor.initialiseSet1();
  m_sensor.getReadingsSet1();

  select(2, TOP, SET_2);
  delay(2000);
  m_sensor.initialiseSet2();
  m_sensor.getReadingsSet2();

  // select(2, TOP, SET_3);
  // // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();


  // select(2, MIDDLE, SET_1);
  // delay(2000);
  // m_sensor.initialiseSet1();
  // m_sensor.getReadingsSet1();

  // select(2, MIDDLE, SET_2);
  // delay(2000);
  // m_sensor.initialiseSet2();
  // m_sensor.getReadingsSet2();


  // select(2, MIDDLE, SET_3);
  // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();


  // select(2, BOTTOM, SET_1);
  // delay(2000);
  // m_sensor.initialiseSet1();
  // m_sensor.getReadingsSet1();

  // select(2, BOTTOM, SET_2);
  // delay(2000);
  // m_sensor.initialiseSet2();
  // m_sensor.getReadingsSet2();

  // select(2, BOTTOM, SET_3);
  // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();
}

void initialise_pins() {
  digitalWrite(TOP, LOW);
  digitalWrite(MIDDLE, LOW);
  digitalWrite(BOTTOM, LOW);
  digitalWrite(SET_1, LOW);
  digitalWrite(SET_2, LOW);
  digitalWrite(SET_3, LOW);
}

void select(int num, ...) {
  va_list valist;
  uint8_t this_pin;
  initialise_pins();
  char message_buffer[20];

  va_start(valist, num); // initialize valist for num number of arguments
  for (uint8_t i = 0; i < num; i++)
  {
    this_pin = va_arg(valist, int);
    sprintf(message_buffer, "Setting pin %d", this_pin);
    utils.debug(message_buffer, false);
    digitalWrite(this_pin, HIGH);
  }
  va_end(valist); // clean memory reserved for valist
}