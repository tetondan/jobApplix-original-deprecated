angular.module('myApp.businessDashBoard', [])
  .controller('BusinessDashboard', function($location, $scope, $rootScope, $http){
    $scope.businessId = window.localStorage.getItem('JOBAPPLIX_TOKEN');
    //all business info held in rootscope
    $scope.applications = '';
    $scope.logout = function(){
      window.localStorage.removeItem('JOBAPPLIX_TOKEN');
      $location.path('/');
    }
    $scope.getApps = function(name){
      $http({
        method: 'GET',
        url: '/applications/' + name,
      }).then(function(data){
        $scope.applications = data.data;
      })
    }
  })