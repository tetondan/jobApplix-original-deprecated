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
    $scope.confirmPassword = '';
    $scope.isUsernameTaken = false;
    $scope.isCustomUrlTaken = false;
    $scope.noMatch = false;
    $scope.rejectedClassUsername;
    $scope.rejectedClassUrl;
    $scope.checkUserName = function(){
      if($scope.business.username == undefined) {return $scope.isUsernameTaken = false};
      BusinessDataServices.checkIfUsernameTaken($scope.business.username)
        .then(function(data){
          if(data){
            $scope.isUsernameTaken = true;
            $scope.business.username = ''
            $scope.rejectedClassUsername = {'background-color': '#FF9E9E'};
          } else {
            $scope.isUsernameTaken = false;
            $scope.rejectedClassUsername = {};
          }
        })
    }

    $scope.checkCustomUrl = function(){
      if($scope.business.customUrl == undefined) {return $scope.isCustomUrlTaken = false};
      BusinessDataServices.checkIfCustomUrlTaken($scope.business.customUrl)
        .then(function(data){
          if(data){
            $scope.isCustomUrlTaken = true;
            $scope.business.customUrl = ''
            $scope.rejectedClassUrl = {'background-color': '#FF9E9E'};
          } else {
            $scope.isCustomUrlTaken = false;
            $scope.rejectedClassUrl =  {};
          }
        })
    }

    $scope.passwordsMatch = function(){
      if($scope.business.password !== $scope.confirmPassword){
        $scope.confirmPassword = '';
        $scope.noMatch = true; 
        $scope.rejectedPassword = {'background-color': '#FF9E9E'};
      } else {
        $scope.noMatch = false;
        $scope.rejectedPassword = {};
      }
    }

    $scope.businessSignUp = function(){
      $scope.passwordsMatch();
      $scope.checkCustomUrl();
      $scope.checkUserName();
      if(!$scope.isCustomUrlTaken && !$scope.isUsernameTaken && !$scope.noMatch){
        BusinessDataServices.businessSignup($scope.business)
          .then( function (data) {
            $state.go('dashboard.setup')
            //redirect user to page setting up a custom application template.
          });
      };
    };
  })