#include <SensorSelection.h>

#define LEVEL_1_SELECT 0
#define LEVEL_2_SELECT 12
#define LEVEL_3_SELECT 27
#define SET_1_SELECT 26
#define SET_2_SELECT 25
#define SET_3_SELECT 33
#define SCL 22
#define SDA 21
#define DATA1 36
#define DATA2 19
#define ANALOGUE 32
#define BUTTONPIN 39

char message_buffer[100];

void initialise_pins();
void select(int level_select, int set_select);

SensorModule m_sensor;

void SensorSelection::setAndLevelSelection()
{
  /*In this method, we will go through each of the Levels and sensor Sets within the Grow Cube. When a 
  * level is selected, we call the initialise() method to first turn off power to every level and set,
  * and then turn on power to only the level and set that has been selected. After the last
  * level and set have had their readings taken, the SensorModule class handles the rest of the process from this point.
  */
  pinMode(BUTTONPIN, INPUT_PULLDOWN);
  pinMode(LEVEL_1_SELECT, OUTPUT);
  pinMode(LEVEL_2_SELECT, OUTPUT);
  pinMode(LEVEL_3_SELECT, OUTPUT);
  pinMode(SET_1_SELECT, OUTPUT);
  pinMode(SET_2_SELECT, OUTPUT);
  pinMode(SET_3_SELECT, OUTPUT);

  pinMode(SCL, INPUT);
  pinMode(SDA, INPUT);
  pinMode(DATA1, INPUT);
  pinMode(DATA2, INPUT);
  pinMode(ANALOGUE, INPUT);

  select(LEVEL_1_SELECT, SET_1_SELECT);
  delay(2000);
  m_sensor.initialiseSet1();
  m_sensor.getReadingsSet1();

  select(LEVEL_1_SELECT, SET_2_SELECT);
  delay(2000);
  m_sensor.initialiseSet2();
  m_sensor.getReadingsSet2();

  // select(LEVEL_1_SELECT, SET_3_SELECT);
  // // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();
  



  // select(LEVEL_2_SELECT, SET_1_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet1();
  // m_sensor.getReadingsSet1();

  // select(LEVEL_2_SELECT, SET_2_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet2();
  // m_sensor.getReadingsSet2();


  // select(LEVEL_2_SELECT, SET_3_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();




  // select(LEVEL_3_SELECT, SET_1_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet1();
  // m_sensor.getReadingsSet1();

  // select(LEVEL_3_SELECT, SET_2_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet2();
  // m_sensor.getReadingsSet2();

  // select(LEVEL_3_SELECT, SET_3_SELECT);
  // delay(2000);
  // m_sensor.initialiseSet3();
  // m_sensor.getReadingsSet3();


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