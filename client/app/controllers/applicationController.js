angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($state, $scope, $http, $location, customTemplate, AppDataServices){
    //collect all info and store it in info object
    $scope.template = customTemplate.data;
    $scope.businessData = customTemplate.data.businessId[0];
    $scope.application = {};
    $scope.application.businessId = customTemplate.data.businessId[0]._id;
    $scope.application.education = {
        highschool: {
          type: 'High School',
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: ''
        },
        college: {
          type: 'College or University',
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: ''
        },
        tradeSchool: {
          type: 'Trade or Vocational School',
          schoolName: '',
          location: '',
          yearsCompleted: '',
          fieldOfStudy: '',
          degree: ''
        }
      };
    $scope.application.workReferences = [{
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
      }]
    $scope.application.personalReferences = [
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
        }]
    //submit application to server. 
    $scope.submit = function(){
      var application = $scope.application;
      application.education.highschool.type = undefined;
      application.education.college.type = undefined;
      application.education.tradeSchool.type = undefined;
      AppDataServices.submitApplication(application)
      .then( function (data) {
        $state.go('success')
        //redirect user to page thanking them for submitting an application and supplying a link to return to main page.
      });
    };
  })