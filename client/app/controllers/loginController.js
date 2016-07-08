angular.module('myApp.loginCont', [])
  .controller('LoginController', function($state, $scope, $rootScope, $http, BusinessDataServices){
    $scope.error = false
    $scope.business = {};

    $scope.logIn = function(){
      BusinessDataServices.businessLogin($scope.business)
      .then( function (data) {
        if(data.status === 200){
          $rootScope.businessData = data.data;
          $state.go('dashboard.tabs')
        }
      })
      .catch( function() {
        $scope.error = true
      })
    }
  })