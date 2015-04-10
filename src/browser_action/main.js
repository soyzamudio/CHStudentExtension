angular.module('alert', ['ui.router', 'firebase'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('name');

  $stateProvider
  .state('name', { url: '/name', templateUrl: 'templates/name.html', controller: 'NameController'})
  .state('home', {url: '/home', templateUrl: 'templates/home.html', controller: 'HomeController'})
}])
.run(['$rootScope', '$state', function($rootScope, $state) {
  chrome.storage.local.get('name', function(name) {
    if (name.name) {
      $rootScope.name = name.name;
      $state.go('home');
    }
  });
}]);
