angular.module('myApp.splashCont', [])
  .controller('Splash', function($location, $scope, $rootScope, $http){
    $scope.signup = function(){
      $location.path('/signup');
    }
    $scope.login = function(){
      $location.path('/login');
    }
  })