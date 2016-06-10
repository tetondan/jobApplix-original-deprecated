angular.module('myApp.loginCont', [])
  .controller('LoginController', function($location, $scope, $rootScope, $http){
    $scope.error = false
    $scope.username = '';
    $scope.password = '';
    $scope.logIn = function(userAndPass){
      $http({
        method: 'POST',
        url: '/api/businesses/signin',
        data: userAndPass
      }).then( function (data) {
        if(data.status === 200){
          window.localStorage.setItem('JOBAPPLIX_TOKEN', data.data._id)
          $rootScope.businessData = data.data;
          $location.path('/businessDashboard')
        }
      }).catch(function(){
        $scope.error = true;
      });
    }
  })