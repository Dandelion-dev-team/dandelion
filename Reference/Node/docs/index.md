---
hide:
  - toc
---

# Dandelion IoT node reference

!!! info inline end "Changes in v1.0"

    * Ability to calibrate EC sensors


### Welcome to the user guide for your IoT node.

These pages cover the important things you need to know about setting up
and using your Dandelion IoT node. The content will be updated as new versions 
of the software are released. These notes will always refer to the current
version which you can find on the *Downloads* page.

??? info inline end "Changes in v0.92"

    * Support for all three GrowCube layers
    * Removal of [moisture sensors](sensors/top.md)
    * Introduction of [sensor selection switch](sensors/lower.md)
    * New way to get into [config mode](config.md#getting-into-configuration-mode)
    * [pH sensor](sensors/ph.md#taking-ph-readings) calibration and readings
    * [Temperature probe identification](sensors/ds18b20.md#identifying-your-temperature-probes)

If you would like to request an addition or amendment to these pages, please contact 
Brian Davison [b.davison@napier.ac.uk](mailto:b.davison@napier.ac.uk)

## What's a *node*?

*Node* is the term generally used to refer to one device connected to a shared 
network. In the Internet of Things (IoT), the aim is to connect many (potentially
all) real-world objects to the Internet so that they can exchange information.
In that scenario, everything becomes a node. 

Your IoT node is based on a microprocessor called a LilyGo T5 which is essentially
a small computer. Unlike your laptop, it does not have an operating system like
Windows, MacOS or Linux. Instead, it has only a single program called *firmware*
with a specific purpose which runs continuously. Its job is to take readings from 
the attached sensors and send the information back to the Dandelion app over the 
Internet. It does this by connecting to an available wifi access point.

![T5 microprocessor#centred](img/T5.png)

## Getting started

There are three things you need to do to get your node up and running:

1. [Configure](config.md) it to connect to your local wifi network
2. [Register](register.md) your node using the Dandelion app so that it is associated with your school
3. [Install](install.md) it in your GrowCube

??? question "Can I get started with just the top-level sensors?"

    Yes you can. Your node will collect data from the top level of the GrowCube
    and you will be able to add the sensors for the other two levels later.

??? question "Can I register my node without connecting it to wifi?"

    Yes you can. Registration is done through the Dandelion app using a device such as a 
    phone or laptop. The piece of information that you need is the MAC address of your node.
    You can find this by putting the node into [configuration mode](config.md) and 
    connecting to it using a web browser.

The links above take you to written instructions for each stage, and the video below covers them
all in one go.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hls6dXk5p1A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview of operation

The node has two modes, one for configuring its settings and another for normal
operations. In the latter mode, the node goes through the following cycle

1. Read the sensors
2. Connect to wifi
3. Transfer the sensor data to the Dandelion app
4. Disconnect from wifi
5. Sleep for an hour and then repeat

Sensor reading are therefore taken hourly. The node sleeps between readings to
conserve battery power.

##  Display

The node incorporates an e-paper display. Instead of using a backlight to 
create an image, this type of display controls black and white particles to
create an image that relies on reflected light just like a printed image.

Because power is only required to change the image and not to maintain it, this
type of display is very power efficient. However it is important to remember
that the image on the screen is the one created the last time it was refreshed.
For example, if the battery runs out an image will still be displayed.

E-paper displays can be subject to 'ghost' images and other random effects. If
you notice any strange marks on the image, please ignore them. They should have
no effect on the operation of the node.

## Power supply

The node is powered by a 3.7v lithium polymer (LiPo) battery, and so it does 
not need to be connected to a mains supply. From time to time, the battery will
need to be recharged. To do this, connect the T5 unit to a power source using
the micro USB connector. The power source could be a USB mains adapter or a
computer. You should charge your battery for a couple of hours when you first
receive it. Please note that access to the USB connector is very tight. You may
need to pop open the enclosure to insert the changing cable. Alternatively, you
could trim the excess plastic down the sides of the cable connector so that it
fits easily.
