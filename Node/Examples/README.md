# Additional information on Example projects

### testProject
This project was used as a way to test arbitrary components of the project in a standalone area. Can be overwritten and adapted to test whichever component is being worked on as required.

### SecondTestProject
This project is essentially a stripped-back version of the main version of the firmware, where testing for particularly the WiFi, MicroSD Card, Sensor reading-taking, and Level and Set selection has been tested. Essentially acts as a staging environment where code can be tested before being integrated into main version.

Stripped-back refers to components such as event-driven button press & display related components not being present.

### SensorExperimentation
Contains example code for each sensor tested. Comment and uncomment code as required depending on the sensor(s) being experimented with. 

Any experimenting/testing of new sensors can be added to this project.

### readInUnsentReadingsFromSDCard
Main file contains the code developed during testing of reading in readings that have been stored in the unsent file on MicroSD card. However there is a second file in this project which contains the code developed while testing how to read in data from config file also.
If want to run the code related to reading in config file, comment out existing code in main.cpp, uncomment the commented code in readInConfigFile.cpp into main, copy it into main.cpp and run.

