(function(){
   var app = angular.module('myApp',['myApp.applicationCont','myApp.splashCont','myApp.signupCont','myApp.loginCont', 'myApp.businessDashBoard', 'myApp.businessSetup','myapp.appDataServices','myApp.businessDataServices','ui.router']); 
    //TODO reconfigure to use UI router to allow for nested routes
    app.config(['$logProvider','$stateProvider', '$urlRouterProvider', function ( $logProvider, $stateProvider, $urlRouterProvider) {
      $logProvider.debugEnabled(true);
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/templates/splash.html',
          controller: 'Splash'
        })
        .state('application', {
          url: '/apply/:businessName',
          templateUrl: 'app/templates/application.html',
          controller: 'ApplicationController',
          resolve: {
            customTemplate: 
              function($stateParams, $http){
                return $http.get('/api/businesses/'+ $stateParams.businessName);
              }
          }
        })
        .state('success', {
          url: '/success',
          templateUrl: 'app/templates/success.html'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/templates/signup.html',
          controller: 'SignupController'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/templates/login.html',
          controller: 'LoginController'
        })
        .state('businessDashboard', {
          url: '/businessDashboard',
          templateUrl: 'app/templates/businessFrontpage.html',
          controller: 'BusinessDashboard'
        })
        .state('businessSetup', {
          url: '/businessSetup',
          templateUrl: 'app/templates/businessSetup.html',
          controller: 'BusinessSetup'
        })
        .state('applicationPreview', {
          url: '/applicationPreview',
          templateUrl: 'app/templates/applicationPreview.html',
          controller: 'BusinessSetup'
        })
      }])
}())
//rgb(27,203,249) cool blue color I like 