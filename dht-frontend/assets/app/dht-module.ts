import 'sails.io.js';
import 'highcharts';
import * as ng from 'angular';
import 'ui-router';
import 'angular-sails';
import 'highcharts-ng';
import 'erikflowers/weather-icons/css/weather-icons.css!'
import {DhtController} from './controllers/dht';
import {RouteConfig} from './dht-route';
import {DhtService} from './services/dht-service';

const app:ng.IModule = ng.module('app.dht', [
  // angular modules

  // custom modules

  // 3rd party modules
  'ui.router',
  'ngSails',
  'highcharts-ng'
]);

app.config(RouteConfig);
app.controller('DhtController', DhtController);
app.service('DhtService', DhtService);
app.config(['$sailsProvider', $sailsProvider => {
    $sailsProvider.url = 'http://piglet-bbb:1337';
}]);
