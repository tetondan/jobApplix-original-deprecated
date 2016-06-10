angular.module('myApp',['myApp.applicationCont','myApp.splashCont','myApp.signupCont','myApp.loginCont', 'myApp.businessDashBoard', 'ngRoute']) 
  //TODO reconfigure to use UI router to allow for nested routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/templates/splash.html',
        controller: 'Splash'
      })
      .when('/apply/:businessName', {
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
      .when('/businessDashboard', {
        templateUrl: 'app/templates/businessFrontpage.html',
        controller: 'BusinessDashboard'
      })
      .otherwise('/')
    })

//rgb(27,203,249) cool blue color I like 