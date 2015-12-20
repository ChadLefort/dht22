# Beaglebone Black DHT22 App #

This is the first node.js app. It's made to use with a DHT22 temperature sensor and a Nokia 5110 LCD display all controlled on a Beaglebone Black.

Using Adafruit's python libraries for both the temperature sensor and LCD display I created a python script that polls the temperature sensor ever 30 seconds and then display the information on to the LCD display. It also displays a little image with a brief description of how it feels in the room before showing the overall statistics.

I then log that temperature data to a MySQL database, and using a Node.js server running socket.io display the temperature data onto a web page that updates in real time.

You can watch [this video](https://www.youtube.com/watch?v=wjFFyl02oSk) to see it in action!

### Getting Started ###

* view [this tutorial](https://learn.adafruit.com/nokia-5110-3310-lcd-python-library/usage) on how to install Adafruit's Nokida-5110 LCD library
* view [this tutorial](https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/software-install-updated) on how to install Adafruit's DHT22 library
* pip install mysql-connector-python --allow-external mysql-connector-python
* modify sensor.py and server.js files with your database credentials
* npm install
* node app.js
