# Electrical conductivity sensors

The electrical conductivity (EC) sensors used in the Dandelion node are supplied by 
[DFRobot](https://www.dfrobot.com/product-1662.html) as a ready-made unit.

![EC sensor](../img/ec.png#centred)

The circuit board produces an oscillating electrical signal which is transmitted from one of 
the metal contacts on the probe to the other. This provides a measurement of the ability of
the medium to conduct electricity.

Pure water is actually a poor conductor of electricity. However, just small amounts of dissolved
substances can cause a large rise in conductivity. Because of this, EC is a good indicator of
the amount of nutrient material in a solution. EC is often used to calculate a quantity called
*Total Dissolved Solids* (TDS) in hydroponics, and the DFRobot unit we are using is actually 
sold as a TDS meter.

The scientific relationship between EC and TDS is quite complex as discussed in this
[review article](10.1088/1755-1315/118/1/012019). For hydroponics projects, the following 
simplified relationship is often used:

$$
TDS = 1000 EC / 2
$$

## Installing the EC probe

Like the pH sensor, the EC probe is designed for use in liquids. To get a good signal 
from the GrowCube you will have to ensure a good contact with the nutrient
solution. This should be possible by creating a small pocket in the growfelt
using a craft knife or scissors. Alternatively, there is a circular indentation
in each tray of the GrowCube where liquid can collect and you could place the EC
probe there.

## Sensor selection

The sensor units in the middle and bottom layers of the GrowCube have a switch that enables
either the pH sensors or the EC sensors. This is to prevent electronic interference between
the two devices. Most of the time, the switch will be kept in the position shown below with
the **O** side depressed. In this position, the EC sensors are enabled.

[![Sensor selection switch](../img/switch.png#centred)](../img/switch.png)

## Calibration

Your sensors may show some variation in their readings for a range of different reasons. Most 
of the factors that affect the readings will be fairly constant, and so identifying a set of
[calibration](calibration.md) values should ensure that the readings you take are accurate. 
Some generic values have been included in the node firmware. They were generated through testing 
on a similar node, but for best results, you should calibrate yor EC sensors yourself. 
This section describes the procedure you should follow.

### Equipment

You will need:

* An EC meter like [this one](https://www.manomano.co.uk/p/lcd-cran-tds-ec-mtre-digital-tds-testeur-3-en-1-pour-qualit-de-leau-stylo-testeur-ec---rtroclairage-blanc-52928618)
to provide benchmark measurements. These are available from any hydroponics shop or online for a 
few pounds.
* A container for your test solution.
* Some table salt or sugar - anything that dissolves easily in water.

### Procedure

The assumed relationship between the sensor readings and the actual EC of the solution is a 
second-order polynomial (described on the [calibration](calibration.md) page). Because
of this, we need three measurements of different levels of conductivity. The first is easy: we
just remove the EC probes from the GrowCube, dry them off and take a reading. The next two
readings require a weakly conductive solution and a strongly conductive solution. We can make
them up by dissolving a small amount of salt in some water, and then adding a bit more for the
second reading. The node firmware takes care of the calculations.

To start the process, press the reset button. When the node reboots and the main menu is
displayed, choose the **Calibrate EC** option. To move from one menu item to the next, 
press the control button. To select an item off the menu, hold the control button for at
least one second while the item is highlighted.

[![EC calibration menu option](../img/calibrate_ec.png#centred)](../img/calibrate_ec.png)

After selecting the menu option, a series of prompts on the node guides you through the
following steps:

1. Remove the EC probes from the GrowCube and dry them with an absorbant paper towel
2. Wait until a stable reading has been obtained
3. Add salt to some water in your container until the EC reading from the meter is between 500
and 750 &mu;S/cm
4. Enter the EC of the test solution in &mu;S/cm (see below)
5. Put the EC probes into the solution and take a reading
6. Add some more salt to the solution until the meter reads between 1750 and 2000 &mu;S/cm
7. Enter the new EC reading in &mu;S/cm (see below)
8. Put the EC probes into the solution and take a second reading

When the calibration procedure is finished, three coefficients are calculated for each layer
of the GrowCube. These are the values $C_2$, $C_1$ and $C_0$ in the equation

$$
y = C_2 x^2 + C_1 x + C_0
$$

After storing the coefficients for later use, the node restarts.

If you are interested to know what values have been calculated, you can see them by putting
the node into [configuration mode](../config.md) and calling up the configuration web page.

## Entering numerical values

The node only provides limited ways for you to interact with it. Entering numerical values
is therefore quite a laborious process. When the procedure requires a numerical value, it
presents you with a series of fields where you can put the individual digits of the number.
At any one time, one of the digits will be highlighted. This is the *selected digit*. You
can move from one digit to the next by pressing the control button. When you get to the last
digit, pressing the button takes you to the **Save** option. If you press the button again, 
it will cycle back to the beginning and take you to the first digit again.

[![Entering numerical values](../img/enter_number.png#centred)](../img/enter_number.png)

When a digit is highlighted, you can change its value by holding the control button down for
at least one second. This will display the numbers 0 - 9 along the bottom of the display as
shown below. Pressing the control button moves from one number to the next. If you press and
hold the control button for at least one second, you will set the value of the selected digit.

[![Selecting a digit](../img/digit_selection.png#centred)](../img/digit_selection.png)

Once the value you want is displayed, move to the **Save** option and press the control button
holding it down for at least one second. This will record the value you have entered and move
on to the next step in the procedure.

**NB**: If the value you want to enter has fewer than four digits, make sure that it starts
in the right position. For example, to enter a three-digit number, leave the first digit of
the display showing zero. This makes mathematical sense - leading zeroes have no effect on 
the value of a number.

??? danger "What can go wrong?"

    * It is easy to put too much salt into the solution. EC in hydroponics usually ranges
    between 500 and 2000 &mu;S/cm.
    * Check that the sensor selection switch is set to enable the EC sensors and not the
    pH sensors
    * The node firmware is programmed to wait up to five minutes to let you move the probes 
    from one solution to another. If you take longer than that, it will time out and reboot. 
    Normally, five minutes is much more time than you need, but don't get caught out!
