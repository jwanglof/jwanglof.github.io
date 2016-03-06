---
layout: post
title:  "My initial hassle with the Intel Galileo Gen 2, part 2"
date:   2016-03-06 08:41:00 +0100
categories: hardware galileo
---

Hi again!

Second day trying to do something on the Galileo (read my first post [here]({% post_url 2016-03-05-intel-galileo %})).

I left, and went to bed, when I had figured out that I could just as easily use Python instead of using Node when writing my program. With Node it was really easy to write and upload with the help of the Intel XDK IoT Edition IDE, but it doesn't be that simple with Python-code. Seems like the easiest way right now is to use `scp`, which works fine since I found [this plugin][source-synchronizer] for PyCharm (which is my favorite Python IDE for sure). With this plugin I can just right click on the file that should be uploaded and voila, it's done!

However, did you really think it was going to go smooth? No way Hose!

I seems like the OS-image doesn't come with pip (no reason why, it's a must when developing with Python!) but I did some googling and found [this repo's script][repo-pip] and at the bottom of that script is instructions how to install pip on the board:

~~~
wget https://bootstrap.pypa.io/get-pip.py --no-check-certificate
python get-pip.py 
~~~

I couldn't run the first command on the Galileo so I just ran it on my machine, and then used the Source Synchronizer-plugin to SCP it over to the board, and then just ran the commands, and we got pip on the board! I got some errors while installing pip but it seems to be working as intended ;)

The first thing I did was to copy [this example][example-blink], uploaded it to the board, SSH:d into it and ran the program, and it worked!
For the first time after I started with this board I finally felt like I was coming somewhere!

Since I'm using the [Base Shield V2][seed-base-shield] together with the Galileo-board I wanted an easy way to map the pins from the board to the pin-numbers that the base-shield shows. Again, I'm totally new to all this so this was a bit of a hassle but I think I get it now ;P
From looking at the [schematics on the base-shield][base-shield-schematics] I could figure out how to map the pins, and this is what my `pins.py`-file look like (I guess that the thing to look at is the D-number, i.e. A0 have D14 and D1 have D1):

~~~ python
analogPins = {
    0: 14,
    1: 15,
    2: 16,
    3: 17
}

digitalPins = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8
}

ledPin = 13
~~~

This makes it easy to use i.e. A0 (analog pin 0):

~~~ python
import pins
ledPin = pins.ledPin
analogPin0 = pins.analogPins.get(0)
~~~

Sooo, I guess that's it. The board is up and running, I can write Python-programs to it and upload them with ease. I will write more posts about my experiences with the Galileo and hopefully I won't bump into trouble on every step =P


<!-- Links -->
[base-shield-schematics]: http://www.seeedstudio.com/wiki/images/0/03/Base_Shield_v2.pdf
[example-blink]: http://wiring-x86.readthedocs.org/example_blink.html
[repo-pip]: https://github.com/gbaman/Intel-Galileo-Setup/blob/master/Main-setup
[seed-base-shield]: http://www.seeedstudio.com/depot/Base-Shield-V2-p-1378.html?cPath=98_16
[source-synchronizer]: https://plugins.jetbrains.com/plugin/7374?pr=idea_ce

<!-- Images -->
[boot-gibberish]: boot-gibberish.png
{: height="50px" width="50px"}