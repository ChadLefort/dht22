import 'moment';

export class Dht {
  fahrenheit: number;
  celsius: number;
  humidity: number;
  createdAt: string;

  constructor(fahrenheit: number, celsius: number, humidity: number, createdAt: string) {
    this.fahrenheit = Math.round(fahrenheit * 100) / 100;
    this.celsius = Math.round(celsius * 100) / 100;
    this.humidity = Math.round(humidity * 100) / 100;
    this.createdAt = moment(createdAt).format('MM/DD h:mm:ss');
  }
}

export class Output {
  fahrenheit: Array<number>;
  celsius: Array<number>;
  humidity: Array<number>;
  createdAt: Array<string>;
}
