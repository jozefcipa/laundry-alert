Hey, congrats!
You've found a secret journal of all the steps and failures I encountered while working on this project.
I started writing this log to track the progress and document all the steps taken.

### Orange PI progress

- Install Node.js
- For some reason, I don't have any more free space on the SD card (16GB) - found out I need to configure the partitions ([link](http://www.orangepi.org/orangepibbsen/forum.php?mod=viewthread&tid=844)) 🤷‍♂️ 
- Install Node.js again
- Install nano editor so I can edit files like a normal sane person
- Install npm package `onoff` that is supposed to control the GPIO
    - The library requires Python installed
    - Install Python 3.6 - Some troubles with installing as my Orange PI is quite old and uses outdated Ubuntu 16.04 - eventually had to build the whole Python binary manually
    - Install some random Python libraries for GPIO
- Nothing of that worked, yay
- Finally found and installed [WiringOP](https://github.com/orangepi-xunlong/wiringOP) library
- This turns out to be working, I'll write a custom Node.js wrapper around the CLI utility
- Wasted a lot of time with Python and all those questionable stuff around it, now I can throw it all away
- Moving on, I tried to run the api, but it gives an error that it can't find `node_modules/sqlite3/lib/binding/napi-v6-linux-glibc-arm/node_sqlite3.node`
- In the end it was enough to just reinstall npm packages and wait about 12 minutes for the library to compile
- I ran the program and the LED turned on 😍 we are on the good way
- Reading gpio - easy, seems to work, returns only 1/0 as it's a digital input but that works for me, if I wanted to read analog values, I'd need an A/D converter
- I am setting up WiFi, I was so wrong when I thought I only needed to set up the SSID and password
- WiFi is not showing up at all, I'm trying to edit some configurations
- I created a configuration filed `/etc/wpa_supplicant/wpa_supplicant.conf`
- Looks like it's a tricky problem, supposedly some problem with the driver or the board itself, I will probably have to buy either a WiFi extender and connect it via Ethernet or get a USB WiFi dongle, but there I'm afraid that would require another configuration
- Eventually I gave up and bought some used extender from the internet, connected it via LAN and it started working immediately
- Configuring a static IP address (`/etc/network/interfaces.d/eth0`)
- I installed Nginx because I need an SSL for the API
- The IP address doesn't want to stay, it keeps changing back to the `.234` which is assigned by DHCP 🤷‍♂️ 
- Generated an SSL ceritificate only to find out that my iPhone doesn't like self-signed certificates 😑 
- I've been fiddling with certificates all evening
- After reading several articles and trying many different options it still didn't work, but then I came across a tool called `mkcert` with which I got it all up and running in less than 5 minutes 😍 
- I bought a desoldering pump and  stannum and I killed about an hour by soldering three cables which I didn't end up soldering as I wanted because those small holes can't be cleaned so I just connected it somehow on the cables - not proud of it at all
- When I thought that I will just tweak the details and everything is done, I realized the problem with two IP addresses - `.234` and `.100` and  `.100` always disconnects after some time and the SSH stops working - it drives me crazy
- Today I finally attached it to the washing machine and found one bigger problem - the signal light on the washing mchine is quite weak and as we're only reading 0/1 the photo resistor doesn't make enouch voltage to switch the value to 1 🫤 I'll have to add an A/D converter after all
- I've soldered the A/D converter (MCP3002) and now I have to somehow make SPI work on Linux ... but it looks quite hardcore, considering I know NOTHING about how it works, this is not the way...
- Finally after a long break I got back to it again, I tried some other circuit with a transistor but it didn't work so I got pissed off and bought a mini "Arduino" (Seeduino) for $5 and there I programmed a simple converter that sends a 1 when the value on the resistor is lower than the specified threshold
- This seems to work on Orange pi, so hopefully it will be good
- I set up rsync, but after every 2-3 rsync when I sync some files, SSH suddenly crashes and I can't connect anymore
- I've noticed that the whole chip is hot as fuck, so maybe it's not due to rsync but because of the temperature, I'll have to attach some fan and see if it helps
- Added the fan, it's working well now but I have a feeling that it increased the power consumption or something because it doesn't want to turn on OrangePi anymore, I have to disconnect the fan and reconnect it after a while when OrangePi boots up.
- Btw, I just found out that the reason why the static IP is constantly getting overwritten is that my DHCP client is always running, it could be solved by turning off the interface, setting the static IP and turning on the interface ([link](https://askubuntu.com/questions/459140/why-dhclient-is-still-running-when-i-choose-static-ip)) but that doesn't work in my case, because the interface can't be configured while it is on ... but when I turn it off it disconnects me from SSH 😑 😑 
- I renamed `/sbin/dhclient` to `dhclient-DISABLED` - hey, it's not stupid if it works
- I also had to change the adapter because the original one was only 1A and the computer didn't start when I connected the fan
- I configured `pm2` to turn on the program after booting up
- I bought a case, cables, a nice LED and resoldered everything to make it more neat, let's see if I can stuff it all into the box 😅 
- I managed to fit everything into the box, omg I can't believe that after half a year of struggling and many hopeless nights, it finally looks promising, hopefully it will work in the long run
- I installed Go to build a `mkcert` version for OrangePi so I can generate SSL certificates on the board
