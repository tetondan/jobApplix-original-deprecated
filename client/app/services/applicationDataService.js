angular.module('myapp.appDataServices', [])
  .factory('AppDataServices', function ($http, $state) {
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

    var updateApplicationGroup = function(id, newGroup){
      var appNewGroupData = {
        id: id,
        group: newGroup
      };  
      return $http({
        method: 'PUT',
        url: 'api/applicationUpdateGroup',
        data: appNewGroupData
      }).then(function(data){
        return data
      })  
    }

    var getCustomTemplate = function(name){
      return $http({
        method: 'GET',
        url: '/api/businesses/'+ name,
      }).then(function(data){
        return data;
      }).catch(function(){
        $state.go('404');
      })
    }

    var updateComments = function(appId, commentArray){
      if(commentArray === undefined){ commentArray = []};
      return $http({
        method: "PUT",
        url: '/api/applicationUpdateComments',
        data: {
          id: appId,
          businessComments: commentArray
        }
      }).then(function(data){
        console.log(data);
      })
    }
    return {
      'submitApplication': submitApplication,
      'updateApplicationGroup': updateApplicationGroup,
      'getCustomTemplate': getCustomTemplate,
      'updateComments': updateComments
    };

  });
