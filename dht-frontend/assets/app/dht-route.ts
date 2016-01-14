export class RouteConfig {
  static $inject: Array<string> = ['$stateProvider', '$urlRouterProvider'];

  constructor(public $stateProvider: ng.ui.IStateProvider, public $urlRouterProvider: ng.ui.IUrlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'nav': {
            templateUrl: '/app/views/nav.html'
          },
          'content': {
            templateUrl: '/app/views/dht.html',
            controller: 'DhtController',
            controllerAs: 'dht'
          }
        }
      })
      .state('about', {
        url: '/about',
        views: {
          'nav': {
            templateUrl: '/app/views/nav.html'
          },
          'content': {
            templateUrl: '/app/views/about.html'
          }
        }
    });
  }
}
