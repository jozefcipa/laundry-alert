# Laundry Alert

> _A small IoT device to monitor your washing machine that sends you a push notification when it's done_

## How it works
  - client (deployed on laundry.iot.jozefcipa.com)
  - checking for device

- Client application

- API

- OrangePi

- GPIO sensor

- briefly describe how it works and link to the other READMEs

```mermaid
  flowchart TB
      client([iOS Web App\nlaundry.iot.jozefcipa.com])-- API -->orangePi([OrangePi]);
      ADConverter([A/D converter\nArduino])--GPIO-->orangePi;
      Photoresistor-->ADConverter;
      orangePi--GPIO-->led(((LED)));
      orangePi-. Web Push Notifications .->client;
      Photoresistor-. detects light .-washingMachine((Washing Machine)) ;
```

### How to run
- install node packages, WiringOP library, nginx, configure nginx, generate SSL certificates, generate VAPID keys

### Makefile
- list of commands

- test gpio command - set LED on/off

## OrangePi
It's using [OrangePi Zero](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-Zero.html
), which is a small single-board computer, similar to Raspberry Pi.

  - GPIO
  - photoresistor
  - https://electropeak.com/learn/interfacing-photoresistor-ldr-sensor-with-arduino/
  - status LED
  
  - [WiringOP](https://github.com/orangepi-xunlong/wiringOP) GPIO library
  - http://wiringpi.com/the-gpio-utility/


### Configuration
- configuration of orange pi (according to the notes)

### GPIO pinout
![GPIO Pinout](./assets//gpio.png)

### Electrical circuit

- TBD

ssh credentials is `root / orangepi`