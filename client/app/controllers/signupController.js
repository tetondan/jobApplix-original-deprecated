angular.module('myApp.signupCont', [])
  .controller('SignupController', function($state, $scope, $rootScope, BusinessDataServices){
    $scope.form = {};
    $scope.business = {};
    $scope.business.username = '';
    $scope.business.customUrl = '';
    $scope.business.password = '';
    $scope.business.name = '';
    $scope.business.address = '';
    $scope.business.phone = '';
    $scope.business.website = 'http://';
    $scope.business.email = '';
    $scope.business.about = '';
    $scope.businessSignUp = function(){
      console.log($scope.business);
      BusinessDataServices.businessSignup($scope.business)
        .then( function (data) {
          $state.go('dashboard.setup')
          //redirect user to page setting up a custom application template.
        });
    };
  })