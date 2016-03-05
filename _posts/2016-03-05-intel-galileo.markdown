---
layout: post
title:  "My initial hassle with the Intel Galileo Gen 2!"
date:   2016-03-05 18:55:00 +0100
categories: hardware galileo
---

So first things first, this Intel Galileo-board is my first experience with this kind of hardware (Arduino-like that is). I've had some courses in school where we played a bit with hardware but nothing major. That being said, I have experience with computer-hardware just not as low-level as this is.

The reason I got it is because I was chosen in a competition from SweClockers ([Bygg Galileo – tävla och vinn Intels stora prispaket på Dustin Expo 2016][swec-competition], it's in Swedish). The price was an Intel Galileo Gen 2 and the [Grove starter kit plus – Intel IoT Edition for Intel Galileo Gen 2 and Edison][seed-starter] from SeeedStudio. The competition was to explain what I would build if I got an "Intel Galileo Grove Starter Kit Plus", and this is what I sent to them:

> Jag skulle bygga ett automatiskt bevattningssystem som jag kan ha i ett växthus, oavsett storlek. Bevattningssystemet skulle ha integrerade sensorer som kollar olika data (jordfuktighet, temperatur i växthuset kontra tempteraturen i växten etc) från de olika växterna mot en databas för att veta hur växten ska bevattnas för optimal växt. Databasen skulle innehålla olika växter med växternas optimala data. M.h.a sensorerna och databasen skulle varje planta ha en egen bevattningsslang som sätts på och knäpps av automatiskt av en Intel Galileo Grove. Detta system skulle även spara den datan den får från växterna så man kan plotta ut grafer för att se hur växterna mår, detta för att uppnå optimal växtlighet.

In english:

> I would build an irrigation system that I can have in a greenhouse, regardless of size. The irrigation system should have integrated sensors which check various data (soil moisture, temperature in the greenhouse versus the plants temperature, etc.) from different plants against a database to know how the plant should be watered for optimal growth. The database would contain different plants with the plants' optimum data. With the help of the sensors sensors and the database, each plant would having its own irrigation hose that is turned on and closes automatically by an Intel Galileo Grove. This system would also save the data it receives from the plants so you can plot the graphs to see how the plants are doing, in order to achieve optimal plant growth.

This blog-post will show the issues I've had so far with the board, and my solutions. I've had a really hard time finding a good "how-to" guide for the Intel Galileo Gen 2 board and I thought that I would try to tackle this. Intel's "Getting Started"-guide is fairly good but I got stuck on the first (!!) step when trying to create a bootable SD-card so I could use NodeJS on the board (which is awesome, btw!). The first instruction is to download the OS for the board which links to this page: [Intel® Galileo Board Downloads page][intel-galileo-download]. I followed the steps but when I tried to write the image to my SD-card I got some corrupted folder-structure on it which couldn't be read when I mounted it. The board booted, but when connected to the board with the FTDI-cable that is included in the starter kit I could partially see the boot-sequence, and partially just gibberish as you can see in the image: [boot-gibberish]

I struggled with this about a day, or two, before I got it working. I don't remember exactly what I did to get it working, and didn't write it down either because I was so pissed at that time. But instead of using Intel's link to the SD-image I used the link from [this][build-electronic-circuits] instead. This didn't work the first couple of times either though, but when I formatted the SD-card enough times (or whatever happened) it worked =P

To write the direct-image to the SD-card I used the same command as Intel's using: `sudo dd if=/path/to/iot-devkit-latest-mmcblkp0.direct of=/dev/mmcblk0 bs=3M conv=fsync`

So fiiiiiiinally I have the board up and running, playing around a bit in Intel XDK IoT Edition IDE and the samples they provide. Everything works as a charm, and now I feel pumped to get started to writing my automated irrigation system. I will build the system in NodeJS because I love it. I also wants to use ES6, and learning more about it since I haven't used all the new functionality yet. So I'm starting to write some code that will fetch the temperature since I can check on Intel's example for it ([Creating a temperature monitoring app using Intel® XDK IoT Edition][intel-galileo-temperature-example]) for help. When I uploaded the first lines of code I immediately hit a wall: The OS the board is using comes with Node version 0.10.38 which didn't seem to support ES6 instructions, even with the `--harmony`-flag...
 
So I decided to upgrade Node, which should be really easy since the Linux distribution comes with a package handler ([opkg][opkg]) but I tried to find how to find a repository that have different Node versions but couldn't find anything except this page from an [Intel Galileo book][intel-galileo-book], which has three options but as I stated before I couldn't find an updated Node in an existing repository so I went with option #2. This didn't go as smooth as it could either, of course..

My initial try with option #2 was to follow the steps in the book: Get the `tar.gz`-file, unpack it, and build it. My first try was to fetch the file to /tmp and unpack it there, but there wasn't enough room on the filesystem since the image-file created two partitions which was just the size it needed to be. So I decided I would add another partition on the SD-card where I could put large files if I needed to. I tried to do this directly on the board (with `fdisk` and `mkfs.ext3`) but it didn't take for some reason. Didn't try to solve it, but instead I just turned off the board, inserted the SD-card into my computer and ran GParted to create an additional partition that was the rest of the SD-card's space. After that I unmounted the SD-card from my computer, inserted it into the board and booted it, when the boot sequence was done I just mounted the new partition to `/mnt/storage`. Now I though I would just re-do the steps from the [guide][intel-galileo-book], so I fetched the `tar.gz`-file again and tried to unpack it but I got the same error as before. Instead of trying to find a solution I just re-did the last SD-card-procedure: removed it, inserted it into my computer, unpacked the `tar.gz`-file, unmounted, inserted and booted the board and voila, I had the unpacked Node on the board.
  
Now the only thing left to do was to build the damn thing, and let me tell you that it takes a long time to build Node on a single-core that runs at 400MHz... A bit of advice: run the commands with a one-liner: `./configure; make; make install`, then you can just leave it over night and hopefully it will be done in the morning..


<!-- Links -->
[build-electronic-circuits]: http://www.build-electronic-circuits.com/intel-galileo-boot-sd-card/
[intel-galileo-book]: https://books.google.se/books?id=xVAnCgAAQBAJ&pg=PA466&lpg=PA466&dq=yocto+opkg+nodejs&source=bl&ots=bdk3McXNvU&sig=fE9tPVVQYMiUOQiSLFtPEiRaSWI&hl=en&sa=X&ved=0ahUKEwiw6v7E-anLAhVtSZoKHeeWB8cQ6AEINjAD#v=onepage&q=yocto%20opkg%20nodejs&f=false
[intel-galileo-download]: https://software.intel.com/en-us/iot/hardware/galileo/downloads
[intel-galileo-temperature-example]: https://software.intel.com/en-us/creating-a-temperature-monitoring-app-using-intel-xdk-iot-edition
[opkg]: http://git.yoctoproject.org/cgit/cgit.cgi/opkg/
[seed-starter]: http://www.seeedstudio.com/depot/Grove-starter-kit-plus-Intel-IoT-Edition-for-Intel-Galileo-Gen-2-and-Edison-p-1978.html
[swec-competition]: http://www.sweclockers.com/artikel/21803-bygg-galileo-tavla-och-vinn-intels-stora-prispaket-pa-dustin-expo-2016

<!-- Images -->
[boot-gibberish]: boot-gibberish.png
{: height="50px" width="50px"}