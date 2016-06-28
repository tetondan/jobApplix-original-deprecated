angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($state, $scope, $http, $location, customTemplate, AppDataServices){
    //collect all info and store it in info object
    $scope.template = customTemplate.data;
    $scope.businessData = customTemplate.data.businessId[0];
    $scope.application = {};
    $scope.application.businessId = customTemplate.data.businessId[0]._id;
    $scope.application.education = {
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
      AppDataServices.submitApplication(application)
      .then( function (data) {
        $state.go('success')
        //redirect user to page thanking them for submitting an application and supplying a link to return to main page.
      });
    };
  })