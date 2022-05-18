# pH sensor

The pH sensor used in the Dandelion node has been specially designed to fit
the space available and to work with the power available from the 3.7v LiPo 
battery. It combines a lab-grade, solid-state sensor from 
[Zimmer and Peacock](https://www.zimmerpeacocktech.com/products/electrochemical-sensors/ph-sensor/),
a signal processing board from [DFRobot](https://wiki.dfrobot.com/Gravity__Analog_pH_Sensor_Meter_Kit_V2_SKU_SEN0161-V2)
and a specially constructed cable to link them together. The pH sensor is the
only one in the set that is meant to be detachable.

## Assembling the pH probe

The pH sensor itself is 25.4 x 7 mm and has electrodes printed on one side. It 
fits into a slot at the end of the cable as shown in the figure below.

![pH sensor and cable](../img/ph_sensor_separate.png#centred)

Although the sensor is quite robust, it is best to hold it by the edges to 
avoid any damage to the electrodes. Make sure that the printed electrodes are
oriented towards the larger part of the connector as shown. Inside the connector
there are three spring contacts that marry up with the three electrodes on the
sensor. Gently push the sensor into the slot and you will feel a small click as
the sensor and the sprung contacts meet. The result should be as shown below.

![pH sensor attached to the cable](../img/ph_sensor_assembled.png#centred)

At the other end of the cable is a BNC connector. This attaches to the signal
processing board which is housed inside the sensor enclosure. Slide the connector
over the protruding bayonet fitting as shown below. Then gently twist the outer
ring to secure it in place.

![pH BNC connector](../img/bnc.png#centred)

## Using the pH probe

The pH sensor is actually designed for use in liquids. To get a good signal 
from the GrowCube you will have to ensure a good contact with the nutrient
solution. This should be possible by creating a small pocket in the growfelt
using a craft knife or scissors. Alternatively, there is a circular indentation
in each tray of the GrowCube where liquid can collect. You could place the pH
sensor there, but be careful that only the sensor itself is in contact with any 
liquid. If the connector gets wet the water will interfere with the readings.

