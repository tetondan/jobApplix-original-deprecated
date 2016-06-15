angular.module('myApp.businessSetup', [])
  .controller('BusinessSetup', function($location, $scope, $rootScope, $http){
    //all business info gathered once successfully logged in.
    $scope.application = {
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      city: true,
      availability: true,
      fired: false,
      firedExplanation: false,
      crimes: false,
      crimesExplanation: false,
      references: false,
      physicalLimitation: false,
      authWorkInUS: false,
      overEighteen: false,
      overTwentyone: false,
      otherLanguages: false,
      whichLanguages: false,
      adequateTrans: false,
      specializedSkills: false,
      otherComments: false,
      zip: true
    }

    $scope.saveForm = function(){
      $location.path('/applicationPreview')
    }
  })