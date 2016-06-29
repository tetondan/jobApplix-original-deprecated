angular.module('myApp.businessDashBoard', [])
  .controller('BusinessDashboard', function($state, $scope, $rootScope, applications, BusinessDataServices){
    //all business info gathered once successfully logged in.
    $scope.apps = applications;

    $scope.application;

    //TODO call a get on the current custom application and apply it to the checkboxes
    $scope.getCurrentForm = function(){
      BusinessDataServices.getCurrentForm()
        .then((data) => {
          if(data.data.length === 0){
            $scope.application = {
              basicInfo: true
            }
          } else {
            $scope.application = data.data[0];
          }
        })
    }

    $scope.saveForm = function(){
      BusinessDataServices.saveForm($scope.application)
      .then( function (data) {
        $state.go('dashboard.preview')
      })
    }
    
    $scope.logout = function(){
      BusinessDataServices.businessLogout()
      .then(function(){
        $state.go('home')
      })
    }
  })