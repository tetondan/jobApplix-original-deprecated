angular.module('myApp.businessSetup', [])
  .controller('BusinessSetup', function($location, $scope, $rootScope, $http){
    //all business info gathered once successfully logged in.
    $scope.application = {
      basicInfo: true
    }
    //TODO call a get on the current custom application and apply it to the checkboxes
    $scope.saveForm = function(application){
      $http({
        method: 'PUT',
        url: '/api/businesses/updateApplication',
        data: application
      }).then( function (data) {
        console.log(data);
        $location.path('/applicationPreview')
        
      })
    }

  })
