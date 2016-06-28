angular.module('myApp.businessDashBoard', [])
  .controller('BusinessDashboard', function($state, $scope, $rootScope, BusinessDataServices){
    //all business info gathered once successfully logged in.
    $scope.applications;
    $scope.logout = function(){
      BusinessDataServices.businessLogout()
      .then(function(){
        $state.go('home')
      })
    }

    $scope.getApps = function(){
      BusinessDataServices.getApps().then(function(data){
        $scope.applications = data.data;
      })
    }
  })