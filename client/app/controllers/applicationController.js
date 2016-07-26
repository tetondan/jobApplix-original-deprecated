angular.module('myApp.applicationCont', [])
.controller('ApplicationController', function($state, $scope, $http, $location, customTemplate, AppDataServices){
    //collect all info and store it in info object
    $scope.template = customTemplate.data;
    $scope.appDirective = 0;
    $scope.form = {}
    // $scope.canAdvance = true;
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
    $scope.application.workReferences = [];
    $scope.application.personalReferences = [];
    $scope.advanceApplication = function(){
      var count = $scope.appDirective
      count++
      $scope.appDirective = count;
    }

    // $scope.$watch('form.appForm.$valid', function(){
    //   if($scope.form.appForm){
    //     if($scope.form.appForm.$valid){
    //       console.log($scope.form.appForm)
    //       $scope.canAdvance = false;
    //     } else if(!$scope.form.appForm.$valid) {
    //       console.log($scope.form.appForm)
    //       $scope.canAdvance = true;
    //     }
    //   }
    // })

    $scope.addWorkReference = function(){
      if($scope.application.workReferences.length < 3 ){
        $scope.application.workReferences.push({
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
        })
      }
    }

    $scope.addPersonalReference = function(){
      if($scope.application.personalReferences.length < 3 ){
        $scope.application.personalReferences.push({
          name: '',
          relationship: '',
          phone: '',
          email: '',
          address: '',
          yearsKnown: 0
        })
      }
    }
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
    window.onbeforeunload = function(){
      return 'Using the back button will delete all of your info. You will be prompted to edit your application at the end. Are you sure you want to leave?';
    };
  })