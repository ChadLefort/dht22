# Beaglebone Black DHT22 App

This project utilized the [Beaglebone DHT npm package](https://www.npmjs.com/package/beaglebone-dht) that I wrote. It took temperate data provided by the package and then wrote the results to a database that then displayed them to a single page application in real time using web sockets.

The app is two separate Sails.js projects built on top of Express and Node.js. The backend project runs off the Beaglebone Black microcontroller and is just an api that you could read temperature data from and also send REST commands to control the sensor. The frontend project that displays the data was built using Highcharts, Socket.io, AngularJS, Typescript, and Gulp.
