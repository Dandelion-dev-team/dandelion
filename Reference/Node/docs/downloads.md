# Downloads

The table below shows the versions of the node firmware that are currently
available. New versions will be added as they are released. The procedure
for upgrading your node is described below the table

| Firmware version | Release date | File                              | Notes                         |
|------------------|--------------|-----------------------------------|-------------------------------|
| 1.0              | 29 Jun 2022  | [Download](downloads/v1.0.bin) | [Notes](downloads/v1.0.md) |
| 0.92             | 20 Jun 2022  | [Download](downloads/v0.92.bin)   | [Notes](downloads/v0.92.md)   |
| 0.91             | 19 May 2022  | [Download](downloads/v0.91.bin)   | [Notes](downloads/v0.91.md)   |
| 0.9              | 10 May 2022  | [Download](downloads/v0.9.bin)    | [Notes](downloads/v0.9.md)    |

## Upgrading

To upgrade your firmware, you need to copy the release file onto the node's SD 
card. There are two ways you can do this - using a file transfer (FTP) application,
or by copying the file onto the card using a card reader. These methods are 
demonstrated in the video below and there are text instructions below that. 
The first two steps are the same in both cases:

1. Download the firmware you wish to install
2. Change the name of the downloaded file to `dandelion.bin`

If you are going to use FTP, make sure that the computer you are using has wifi
capability.

<div  style="text-align: center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/02UjDd8qLZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Using FTP

There are many FTP applications to choose from, but [Filezilla](https://filezilla-project.org/) 
is a popular one. Please refer to the documentation for the application that you 
decide to use. Note that you need to choose the plain FTP option rather than secure 
FTP (SFTP). If you need to enter a port number, you should use 21 and not 22 which 
is used for SFTP. The connection details are:

> **Protocol**: FTP
> 
> **Host**: Use the IP address shown on the node
> 
> **Port number**: 21
> 
> **Username**: dan
> 
> **Password**: delion

Follow the steps below:

3. Put the node into [configuration mode](config.md)
4. Connect to the node's wifi network from the computer where the downloaded file 
is stored
5. Use your file transfer application to connect to the node using the IP address 
shown on the display
6. Copy the file into the folder called `SD` on the node
7. Restart the node by pressing the reset button (or by switching off and back on 
again)

**NB**: When transferring the file to the node, please check that the transfer is
complete by comparing the size of the file on the node with the size the copy on
the computer. If the sizes are different, try the transfer again. If you try to 
upgrade the node with a file that is only partially transferred and error will be
reported and the upgrade will fail.

### Direct copy

Follow these steps if you are using a card reader.

3. Switch off the node by sliding the on/off switch towards the buttons
4. Open the enclosure and remove the SD card
5. Place the SD card into the card reader and copy the release file onto the card making sure that it does not end up inside any folders that may exist
6. Replace the SD card and reassemble the enclosure
7. Switch the node back on

The node automatically checks to see if a file called `dandelion.bin` is available.
If so, it replaces the current firmware and restarts automatically. 

To check that the upgrade has been successful, you can put the node into
[configuration mode](config.md) and check the version number with your web browser. 
