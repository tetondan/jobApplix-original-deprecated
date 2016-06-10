angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($scope, $http, $location){
    //collect all info and store it in info object
    $scope.info = {};
    $scope.info.firstName = '';
    $scope.info.lastName = '';
    $scope.info.phone = '';
    $scope.info.email = '';
    $scope.info.zip = '';
    $scope.info.businessName = ''
    //submit application to server. 
    $scope.submit = function(appInfo){
      console.log(appInfo)
      $http({
        method: 'POST',
        url: '/applications/' + appInfo.businessName,
        data: appInfo
      }).then( function (data) {
        console.log(data, "dataaaaaaaaaaaaaaaaaaaa");
        $location.path('/success')
        //redirect user to page thanking them for submitting an application and supplying a link to return to main page.
      });
    };
  })