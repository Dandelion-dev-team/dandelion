# Configuration

The node relies on a wifi connection to transfer the sensor data back to the
Dandelion app. The figure below shows the chain of connections that is needed.

![Normal operation mode](img/normal.png#centred)

To connect to the local wifi network, the T5 needs the network name and the
password. You will need to use the node's configuration mode to enter these 
details. Configuration mode is illustrated in the figure below.

![Configuration mode](img/config.png#centred)

In this state, the node creates its own wifi network that is not connected
to the Internet. You can connect to this network from a laptop or mobile 
phone to interact with the node as described below.

??? info "Alternative wifi connections"

    If you cannot connect to your school's wifi network for some reason,
    you have a couple of other options. 

    One is simply to create a wifi hotspot
    on a mobile phone. This is a limited solution because it will only work
    while the phone is nearby, switched on and has data available. 

    A second option is to purchase a mobile wifi (mifi) unit that provides an 
    independent wifi connection via a mobile phone network. They are available 
    from most mobile operators and are very cheap to run. The node generates 
    around 1kB of data every hour which amounts to less than 1MB per month. The 
    [Broadband Compared](https://www.broadbandcompared.co.uk/guides/what-is-mifi-and-how-does-it-work) 
    website provides more information about mifi. 

## Getting into configuration mode

The T5 unit has a control button, a reset button and an on/off switch as shown
below.

![T5 controls](img/controls.png#centred)

The node is off when the on/off switch is closest to the two buttons. To switch
the node on, slide the on/off switch away from the buttons.

There are two ways to put your node into configuration mode. When it first starts up, a menu
is displayed where you can choose the `Config mode` option as shown below. To move from one
menu item to the next, press the control button. To select the highlighted menu item, press
the control button and hold it down for at least 1 second.

[![Config menu option](img/menu_config.png#centred)](img/menu_config.png)

The second method is as follows: 

1. Press and release the reset button
2. When the Dandelion logo appears, press the control button three times at roughly one second intervals

Once in configuration mode, the node will display the message shown below along with an IP address.

![Configuration mode](img/config_mode.png#centred)


## Connecting to the node

The node will advertise a wifi network called *Dandelion*. Connect to that network
from your laptop or phone. The default password for the Dandelion network is
*123456789*. Once connected, open a web browser and type in the IP address 
displayed on the node. This will take you to the page shown below.



![Configuration page](img/config_page.png#centred)

Here, you can see the version of the code running on the node as well as its
MAC address. The MAC address identifies the node when it is 
connected to a network and is often needed by computer technicians to allow
a device to connect. **NB**. You will need the MAC address to register your node with
the Dandelion app.

In addition, there are several settings that you can change:

| Setting        | Explanation|
|----------------|------------|
| Node password  | The password for the node's own wifi network|
| Wifi network   | The name of the wifi network that the node should connect to send its data|
| Wifi password  | The password for the network above|
|  Date and time | See below|

> ### Note about the date and time
>
> The node attempts to obtain the correct date and time from the wifi network
> that it connects to. Currently, the data and time is lost when the node is reset
> and so setting the date and time in configuration mode has no effect. In later
> version of the firmware, this may change.

Each setting has to be saved individually. Change the value and click the 
appropriate *Save* button.

Once you have made the changes you want, press the reset button to reboot the
node to start normal operations. 
