# Downloads

The tablebelow shows the version of the node firmware that are currently
available. New versions will be added as they are released. The procedure
for upgrading your node is described below the table

Firmware version | Release date | File | Notes
-----------------|--------------|------|------
0.9 | 10 May 2022  | [Download](downloads/v0.9.bin) | [Notes](downloads/v0.9.md)

## Upgrading

To upgrade your firmware, you will need to use a file transfer application
such as [Filezilla](https://filezilla-project.org/). Please refer to the
documentation for the application that you decide to use. Note that you 
need to choose the plain FTP option rather than secure FTP (SFTP). If you 
need to enter a port number, you should use 21 and not 22 which is used for
SFTP.

Follow the steps below:

1. Download the firmware you wish to install to a computer with wifi capability
2. Change the name of the downloaded file to `dandelion.bin`
3. Put the node into [configuration mode](config.md)
4. Connect to the node's wifi network from the computer where the downloaded file is stored
5. Use your file transfer application to connect to the node using the P address shown on the display
6. Copy the file into the folder called `SD` on the node
7. Restart the node by pressing the reset button (or by switching off and back on again)

The node automatically checks to see if a file called `dandelion.bin` is available.
If so, it replaces the current firmware and the node automatically restarts. 

**NB**: When transferring the file to the node, please check that the transfer is
complete by comparing the size of the file on the node with the size the copy on
the computer. If the sizes are different, try the transfer again. If you try to 
upgrade the node with a file that is only partially transferred and error will be
reported and the upgrade will fail.

To check that the upgrade has been successful, you can put the node into
[configuration mode](config.md) and check the version number with your web browser. 
