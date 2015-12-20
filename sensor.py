#!/usr/bin/python
import time
import mysql.connector
import Adafruit_Nokia_LCD as LCD
import Adafruit_GPIO.SPI as SPI
import Image
import ImageDraw
import ImageFont
import Adafruit_DHT
import requests
import threading

# Database connection.
db = mysql.connector.connect(user='yourUsername',
		         password='yourPassword',
		         host='localhost',
		         database='yourDatabase')


cursor = db.cursor()

addTemp = ('INSERT INTO dht22 '
          '(celsius, fahrenheit, humidity) '
          'VALUES (%s, %s, %s)')

# LCD Config.
DC = 'P9_15'
RST = 'P9_12'
SPI_PORT = 1
SPI_DEVICE = 0

disp = LCD.PCD8544(DC, RST, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=4000000))
disp.begin(contrast=60)
font = ImageFont.truetype('lcd/fonts/minecraftia.ttf', 8)

# Type of sensor.
DHT_TYPE = Adafruit_DHT.DHT22
DHT_PIN  = 'P8_11'

# Display all temperature data on LCD.
def displayAllTempOnLCD(font, celsius, fahrenheit, humidity):
	disp.clear()
	disp.display()

	image = Image.new('1', (LCD.LCDWIDTH, LCD.LCDHEIGHT))

	draw = ImageDraw.Draw(image)

	draw.rectangle((0,0,LCD.LCDWIDTH,LCD.LCDHEIGHT), outline=255, fill=255)

	draw.text((5,0), 'Temperature:', font=font)
	draw.text((5,10), '{0:0.1f} C'.format(celsius), font=font)
	draw.text((5,18), '{0:0.1f} F'.format(fahrenheit), font=font)
	draw.text((5,28), 'Humidity:', font=font)
	draw.text((5,36), '{0:0.1f} %'.format(humidity), font=font)

	disp.image(image)
	disp.display()

# Display image with status.
def displayImageStatus(img, status, positionX, positionY):
	disp.clear()
	disp.display()

	image = Image.open(img).resize((LCD.LCDWIDTH, LCD.LCDHEIGHT), Image.ANTIALIAS).convert('1')

	draw = ImageDraw.Draw(image)

	draw.text((positionX, positionY), status, font=font)

	disp.image(image)
	disp.display()

# Display welcome image.
displayImageStatus('lcd/bbb.png', 'Hello Person!', 14, 37)

time.sleep(5)

while True:
	# Get temperature data.
	humidity, celsius = Adafruit_DHT.read(DHT_TYPE, DHT_PIN)
	fahrenheit = (float(0 if celsius is None else celsius) * 1.8) + 32

	# Skip to the next reading if a valid measurement couldn't be taken.
	if humidity is None or celsius is None or fahrenheit is None:
		time.sleep(5)
		continue

	print '---------------------------------'
	print 'Temperature: {0:0.1f} C'.format(celsius)
	print 'Temperature: {0:0.1f} F'.format(fahrenheit)
	print 'Humidity:    {0:0.1f} %'.format(humidity)

	# Insert temperature data in mysql database.
	tempData = ('{0:0.1f}'.format(celsius), '{0:0.1f}'.format(fahrenheit), '{0:0.1f}'.format(humidity))

	cursor.execute(addTemp, tempData)
	db.commit()

	# Display temperature data on LCD based on temperature.
	if fahrenheit >= 100:
		displayImageStatus('lcd/bbb.png', 'Hotter than Hell!', 0, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	elif fahrenheit < 100 and fahrenheit >= 90:
		displayImageStatus('lcd/bbb.png', 'Pretty Hot!', 4, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	elif fahrenheit < 90 and fahrenheit >= 80:
		displayImageStatus('lcd/bbb.png', 'It\'s Warm!', 16, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	elif fahrenheit < 80 and fahrenheit >= 70:
		displayImageStatus('lcd/bbb.png', 'Pretty cool!', 14, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	elif fahrenheit < 70 and fahrenheit >= 60:
		displayImageStatus('lcd/bbb.png', 'It feels great!', 6, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	elif fahrenheit < 60:
		displayImageStatus('lcd/bbb.png', 'It\'s freezing!', 10, 37)
		time.sleep(5)
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)
	else:
		displayAllTempOnLCD(font, celsius, fahrenheit, humidity)

	time.sleep(30)

# Close the database connection.
cursor.close()
db.close()
