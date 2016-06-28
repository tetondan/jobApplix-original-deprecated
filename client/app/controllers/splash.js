angular.module('myApp.splashCont', [])
  .controller('Splash', function($state, $scope, $rootScope, $http){
    $scope.signup = function(){
      $state.go('signup');
    }
    $scope.login = function(){
      $state.go('login');
    }
  })