angular.module('myApp',['myApp.applicationCont','myApp.splashCont','ngRoute']) 
  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/templates/splash.html',
        controller: 'Splash'
      })
      .when('/application', {
        templateUrl: 'app/templates/application.html',
        controller: 'ApplicationController'
      })
      .when('/success', {
        templateUrl: 'app/templates/success.html'
      })
      .when('/signup', {
        templateUrl: 'app/templates/signup.html',
        controller: 'SignupController'
      })
      .when('/login', {
        templateUrl: 'app/templates/login.html',
        controller: 'LoginController'
      })
      .otherwise('/')
    })

//rgb(27,203,249) cool blue color I like 