angular.module('myApp.businessDataServices', [])
  .factory('BusinessDataServices', function ($http) {
    
    var businessSignup = function(business){
      return $http({
        method: 'POST',
        url: '/api/businesses/signUp',
        data: business
      })
      .then(function(data){
        return data
      })}
    
    var businessLogin = function(userAndPass){
        return $http({
          method: 'POST',
          url: '/api/businesses/signin',
          data: userAndPass
        })
        .then(function(data){
          return data;
        })
    }

    var businessLogout = function(){
      return $http({
        method: 'GET',
        url: '/api/businesses/logout'
      }).then(function(){
        return
      })
    }
    
    var getApps = function(){
      return $http({
        method: 'GET',
        url: '/api/businesses/dashboard',
      }).then(function(data){
        return data
      })
    }

    var saveForm = function(application){
      return $http({
        method: 'PUT',
        url: '/api/businesses/updateApplication',
        data: application
      }).then(function(data){
        return data;
      })
    }
    return {
      'businessSignup': businessSignup,
      'businessLogin': businessLogin,
      'businessLogout': businessLogout,
      'getApps': getApps,
      'saveForm': saveForm
    };

  });
