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
      drugTest: false,
      workReferences: true,
      personalReferences: false,
      education: false,
      physicalLimitation: false,
      authWorkInUS: false,
      validDriversLicense: false,
      overFourteen: false,
      overSixteen: false,
      overEighteen: false,
      overTwentyone: false,
      overtime: false,
      permanent: false,
      otherLanguages: false,
      whichLanguages: false,
      adequateTrans: false,
      specializedSkills: false,
      computerRepair: false,
      proffesionalCerts: false,
      typingSpeed: false,
      veteran: false,
      dateAvailableToBeginWork: false,
      otherComments: false,
      zip: true
    }

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
