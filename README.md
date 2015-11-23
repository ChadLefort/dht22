# Beaglebone Black DHT22 App #

This is the first node.js app. It's made to use with a DHT22 temperature sensor and a Nokia 5110 LCD display all controlled on a Beaglebone Black.

Using Adafruit's python libraries for both the temperature sensor and LCD display I created a python script that polls the temperature sensor ever 30 seconds and then display the information on to the LCD display. It also displays a little image with a brief description of how it feels in the room before showing the overall statistics.

I then log that temperature data to a MySQL database, and using a Node.js server running socket.io display the temperature data onto a web page that updates in real time. Finally, I can get push notification on my phone using Prowl and the Prowl iPhone app. I send the temperature data using an HTTP request to a Lighttpd web server, which then can send that data to the Prowl iPhone app.

You can watch [this video](https://www.youtube.com/watch?v=wjFFyl02oSk) to see it in action!

You will have to modify the sensor.py and server.js files with your database credentials. I'll try to include a package.json and requirements.txt file to make this easier to run and get set up.
