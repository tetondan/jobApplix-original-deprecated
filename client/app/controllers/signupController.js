angular.module('myApp.signupCont', [])
  .controller('SignupController', function($state, $scope, $rootScope, BusinessDataServices){
    $scope.betaPasswordAdvance = false;
    $scope.betaThankYou = false;
    $scope.betaKeyModel = {
      betaKey: '',
      betaKeyEmail: ''
    };
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
    $scope.betaEmailExists = false;
    $scope.betaEnterEmail = function(){
      BusinessDataServices.betaEmail($scope.betaKeyModel.betaKeyEmail)
      .then(function(data){
        if(data){
          $scope.betaEmailExists = true;
        } else {
          $scope.betaThankYou = true;
        }
      })
    }
    $scope.betaKeyEnter = function(){
      BusinessDataServices.betaKeyCheck($scope.betaKeyModel.betaKey)
      .then(function(data){
        if(data){
          $scope.betaPasswordAdvance = true; 
        } else {
          $scope.betaNoAdvance = true;
        }
      })
    }
    $scope.checkUserName = function(){
      if($scope.business.username == undefined) {return $scope.isUsernameTaken = false};
      BusinessDataServices.checkIfUsernameTaken($scope.business.username)
        .then(function(data){
          if(data){
            $scope.isUsernameTaken = true;
            $scope.business.username = ''
          } else {
            $scope.isUsernameTaken = false;
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
          } else {
            $scope.isCustomUrlTaken = false;
          }
        })
    }
    $scope.confirmPassword = {};
    $scope.passwordsMatch = function(){
      if($scope.business.password !== $scope.confirmPassword.confirmPassword){
        $scope.confirmPassword = {confirmPassword: ''};
        $scope.noMatch = true; 
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
            $state.go('dashboard.imageupload')
            //redirect user to page setting up a custom application template.
          });
      };
    };
  })