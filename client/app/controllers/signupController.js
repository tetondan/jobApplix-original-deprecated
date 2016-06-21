angular.module('myApp.signupCont', [])
  .controller('SignupController', function($location, $scope, $rootScope, $http){
    $scope.username = '';
    $scope.customUrl = '';
    $scope.password = '';
    $scope.name = '';
    $scope.address = '';
    $scope.phone = '';
    $scope.website = 'http://';
    $scope.email = ''
    $scope.businessSignUp = function(business) {
      console.log(business)
      $http({
        method: 'POST',
        url: '/api/businesses/signUp',
        data: business
      }).then( function (data) {
        console.log(data, "dataaaaaaaaaaaaaaaaaaaa");
        $location.path('/success')
        //redirect user to page thanking them for submitting an application and supplying a link to return to main page.
      });
    }
  })