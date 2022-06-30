# Middle and bottom layers

The sensor units in the middle and bottom layers only contain the three substrate probes for
pH, electrical conductivity (EC) and temperature. 

During testing, significant electronic interference was observed between the pH and EC sensors. 
Because of this, the design of the sensor unit was changed to incorporate a switch (see below)
to select between the pH and EC sensors ensuring that only one of them was active at any one time.

[![Sensor selection switch](../img/sensor_select.png#centred)](../img/sensor_select.png)

The pH sensor is active when the switch is depressed towards the `|` symbol, and the EC sensor
is active when the switch is depressed towards the `O` symbol. Normally, the switch should be
left in the `O` position so that the EC sensor is enabled. For more information, see the
[pH sensor page](ph.md).
