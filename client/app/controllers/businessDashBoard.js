angular.module('myApp.businessDashBoard', [])
  .controller('BusinessDashboard', function($location, $scope, $rootScope, $http){
    //all business info gathered once successfully logged in.
    $scope.applications = '';
    $scope.logout = function(){
      $http({
        method: 'GET',
        url: '/api/businesses/logout'
      })
    }
    $scope.getApps = function(){
      $http({
        method: 'GET',
        url: '/api/businesses/dashboard',
      }).then(function(data){
        $scope.applications = data.data;
      })
    }
  })