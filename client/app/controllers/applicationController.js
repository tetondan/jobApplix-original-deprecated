angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($scope, $http, $location){
    //collect all info and store it in info object
    $scope.template;
    $scope.businessData;
    $scope.application = {};
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
    $scope.getAppTemplate = function(){
      var businessName = $location.path().split('/')[2];
      $http({
        method: 'GET',
        url: '/api/businesses/' + businessName
      }).then( function(data){
        $scope.template = data.data;
        $scope.businessData = data.data.businessId[0];
        $scope.application.businessId = data.data.businessId[0]._id;
      })
    }
    //submit application to server. 
    $scope.submit = function(){
      var application = $scope.application;
      $scope.application.applicationGroup = 1;
      console.log($scope.application)
      $http({
        method: 'POST',
        url: '/api/applicationSubmit' ,
        data: application
      }).then( function (data) {
        console.log(data, "dataaaaaaaaaaaaaaaaaaaa");
        $location.path('/success')
        //redirect user to page thanking them for submitting an application and supplying a link to return to main page.
      });
    };
  })