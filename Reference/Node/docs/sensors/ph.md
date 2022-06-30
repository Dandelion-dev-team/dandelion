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

## Installing the pH probe

The pH sensor is actually designed for use in liquids. To get a good signal 
from the GrowCube you will have to ensure a good contact with the nutrient
solution. This should be possible by creating a small pocket in the growfelt
using a craft knife or scissors. Alternatively, there is a circular indentation
in each tray of the GrowCube where liquid can collect. You could place the pH
sensor there, but be careful that only the sensor itself is in contact with any 
liquid. If the connector gets wet the water will interfere with the readings.

The sensor units in the middle and bottom layers of the GrowCube have a switch that
enables either the pH sensors or the electrical conductivity (EC) sensors. Most of the time,
they will be in the position shown below with the EC sensors selected. To enable the
pH sensors, the switch needs to be set with the **&mdash;** side depressed.

[![Sensor selection switch](../img/switch.png#centred)](../img/switch.png)


## Taking pH readings

PH sensors are sensitive to their immediate environment and require [calibration](calibration.md)
before use. This means that user intervention is needed as well as some additional equipment 
that you will need to source. In particular, you will need 

* Two types of *buffer solution*, one for pH4 and the other for pH7
* Some distilled or de-ionised water
* Some small containers for liquid

??? question "What is a buffer solution?"

    A buffer solution is simply a liquid that has been specially prepared to have a known
    and precise pH value. If you place your sensor into a pH4 solution, for example, it 
    should read exactly 4.0. However, the readings from a particular sensor can vary over
    time although its *sensitivity* remains more or less constant. Once you have calibrated
    your sensor using a pair of buffer solutions, it will give you reliable readings.

    ![Buffer solutions](../img/buffer_solution.png#centred)

    You can obtain buffer solutions from any hydroponics supplier, and they can also be
    found for very little money on platforms such as eBay.

??? question "What is de-ionised water?"

    De-ionised water is used in vehicle batteries and radiators, and in appliances such as
    irons to prevent furring and scale formation. Essentially, it is water that has had
    all the dissolved impurities removed. It is used here for rinsing the pH probes before
    placing them into a buffer solution. This helps to avoid contaminating the buffer
    solution with impurities that might change its pH.

    ![De-ionised water](../img/de_ionised_water.png#centred)

    De-ionised water can be obtained from any supplier of vehicle maintenance products
    and often from the local supermarket (as the image shows).

To begin the procedure for taking pH readings, reboot the T5 by pressing the reset button. Then
when the menu appears, choose **Read pH**. 

[![pH menu option](../img/read_ph.png#centred)](../img/read_ph.png)

There follows a series of prompts that take you
through the rest of the steps. After you have completed the instruction in the prompt, you 
press the control button to tell the T5 that you are ready to move on to the next step.

The main steps are:

1. Activate the pH probes using the sensor selection switch on each of the two lower sensor units. 
2. Rinse the sensors and place them into a pH4 buffer solution
3. Wait until the reading has stabilised. This can take a few minutes - please be patient!
4. Rinse the sensors and place them into a pH7 buffer solution
5. Again, wait until the readings have stabilised
6. Rinse the sensors and replace them in the GrowCube ensuring that there is good contact 
between the sensors and the growing solution
7. Wait for the readings to stabilise
8. De-activate the pH probes using the sensor selection switch

After taking the pH readings, the node will continue on and read all of the other sensors
before sending the data to the server.

### Rinsing the sensors

It is important not to immerse the housing of the sensor in the de-ionised water because
that would interfere with the electronic signals. Instead, you need to just wash the sensor
itself. There are several ways you could do that safely. For example, you could pour some
de-ionised water into a container, dip the sensor in and move it around gently. Afterwards,
to remove any residual liquid, it is recommended that you dry the sensor carefully using an
absorbent paper towel. Do not rub the surface of the sensor so that the printed electrodes 
are not accidentally damaged. Instead, squeeze the sensor in the paper towel and wait for the
liquid to be absorbed.

??? danger "What can go wrong?"

    * When moving the pH probes around, the sensor may become loose so that it no longer
    meets the electronic contacts inside the sensor housing. Check that the sensor
    is well seated in its housing after each move.

    * In extreme cases, the sensor may catch on something as you are moving it and it can 
    pop open the housing. This is an opportunity to see how it connects to the cable. Just
    press the two halves of the housing together again to reassemble it.

    * Any mixing of the buffer solutions will cause inaccuracy. Likewise, introducing any
    foreign substances into a buffer solution risks changing its pH. If in doubt, rinse the 
    sensors again and use a fresh sample of buffer solution.

    * The node firmware is programmed to wait up to one minute to switch the sensors on or
    off and up to five minutes to move the probes from one solution to another. If you take
    longer than that, it will time out and reboot. Normally, five minutes is much more time
    than you need, but don't get caught out!

    * It is possible to forget to switch the sensors off again after taking the pH readings.
    The prompts on the T5 screen remind you of what you need to do and you can use them to
    make sure you don't forget something.
