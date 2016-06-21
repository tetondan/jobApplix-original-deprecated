angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($scope, $http, $location){
    //collect all info and store it in info object
    $scope.application = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      zip: '',
      availability: {
        amMon: false,
        pmMon: false,
        amTues: false,
        pmTues: false,
        amWed: false,
        pmWed: false,
        amThurs: false,
        pmThurs: false,
        amFri: false,
        pmFri: false,
        amSat: false,
        pmSat: false,
        amSun: false,
        pmSun: false,
      },
      fired: false,
      firedExplanation: '',
      crimes: false,
      crimesExplanation: '',
      drugTest: false,
      workReferences: [{
          employerName: '',
          address: '',
          title: '',
          duties: '',
          startDate: '',
          endDate: '',
          startingPay: '',
          endingPay: '',
          reasonForLeaving: '', 
          supervisorName: '',
          phoneNumer: '',
          canContact: false
        },
        {
          employerName: '',
          address: '',
          title: '',
          duties: '',
          startDate: '',
          endDate: '',
          startingPay: '',
          endingPay: '',
          reasonForLeaving: '', 
          supervisorName: '',
          phoneNumer: '',
          canContact: false
        },
        {
          employerName: '',
          address: '',
          title: '',
          duties: '',
          startDate: '',
          endDate: '',
          startingPay: '',
          endingPay: '',
          reasonForLeaving: '', 
          supervisorName: '',
          phoneNumer: '',
          canContact: false
      }],
      personalReferences: [
        {
          name: '',
          relationship: '',
          phone: '',
          email: '',
          address: '',
          yearsKnown: 0
        },
        {
          name: '',
          relationship: '',
          phone: '',
          email: '',
          address: '',
          yearsKnown: 0
        },
        {
          name: '',
          relationship: '',
          phone: '',
          email: '',
          address: '',
          yearsKnown: 0
        }],
      //add education objects to array
      education: {
        highschool: {
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: false
        },
        college: {
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: false
        },
        tradeSchool: {
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: false
        }
      },
      physicalLimitation: false,
      authWorkInUS: false,
      validDriversLicense: false,
      validDriversLicenseNumber: '',
      overFourteen: false,
      overSixteen: false,
      overEighteen: false,
      overTwentyone: false,
      overtime: false,
      permanent: false,
      otherLanguages: false,
      whichLanguages: '',
      adequateTrans: false,
      specializedSkills: false,
      specializedSkillsList: '',
      computerRepair: false,
      //add ability to add profesional certifications
      proffesionalCerts: [],
      typingSpeed: '',
      veteran: false,
      dateAvailableToBeginWork: '',
      otherComments: ''
    };

    $scope.getAppTemplate = function(){
      var businessName = $location.path().split('/')[2];
      console.log(businessName);
    }
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