angular.module('myapp.appDataServices', [])
  .factory('AppDataServices', function ($http) {
    var submitApplication = function(application){
      application.applicationGroup = 1;
       return $http({
        method: 'POST',
        url: '/api/applicationSubmit' ,
        data: application
      }).then(function(data){
        return data;
      })
    }
    return {
      'submitApplication': submitApplication
    };

  });
