angular.module('app',['ngRoute', 'app.controllers', 'app.services'])

.config(function ($routeProvider) {

  $routeProvider.

      when('/', {
        templateUrl: 'view/home.html',
        controller: 'homeCtrl'
      }).

      when('/login', {
          templateUrl: 'view/login.html',
          controller: 'loginCtrl'
      }).

      when('/cadastro', {
          templateUrl: 'view/cadastro.html',
          controller: 'cadastroCtrl'
      }).

      otherwise({
          redirectTo: '/'
      });
});
