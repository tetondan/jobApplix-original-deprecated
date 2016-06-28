angular.module('myApp.businessSetup', [])
  .controller('BusinessSetup', function($state, $scope, $rootScope, BusinessDataServices){
    //all business info gathered once successfully logged in.
    $scope.application = {
      basicInfo: true
    }
    //TODO call a get on the current custom application and apply it to the checkboxes
    $scope.saveForm = function(){
      BusinessDataServices.saveForm($scope.application)
      .then( function (data) {
        $state.go('businessDashboard')
      })
    }

  })
