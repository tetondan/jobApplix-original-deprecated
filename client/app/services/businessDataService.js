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
      }).then(function(apps){
        
        var appGroups = {
          new: [],
          hired: [],
          inProgress: [],
          highPotential: [],
          pile: [],
          notHired: [],
          empty: true
        };

        if(apps.status !== 204){
          apps.data.forEach(function(app){
            appGroups.empty = false;
            switch(app.applicationGroup){
              case 1: 
                appGroups.new.push(app)
                break;
              case 2: 
                appGroups.hired.push(app)
                break;
              case 3: 
                appGroups.inProgress.push(app)
                break;
              case 4: 
                appGroups.highPotential.push(app)
                break;
              case 5: 
                appGroups.pile.push(app)
                break;
              case 6: 
                appGroups.notHired.push(app)
                break;
            }
          })
        }
        return appGroups
      })
    }
    
    var getCurrentForm = function(){
      return $http({
        method: 'GET',
        url: '/api/businesses/template'
      }).then( function (appTemplate){
        return appTemplate;
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

    var checkIfUsernameTaken = function(name){
      if(name === undefined) return false;
      return $http({
        method: 'PUT',
        url: '/api/businesses/usernameChecker',
        data: {username: name}
      }).then(function(data){
        return data.data;
      })
    }
    var checkIfCustomUrlTaken = function(customUrl){
      return $http({
        method: 'PUT',
        url: '/api/businesses/customUrlChecker',
        data: {customUrl: customUrl}
      }).then(function(data){
        return data.data;
      })
    }
    return {
      'businessSignup': businessSignup,
      'businessLogin': businessLogin,
      'businessLogout': businessLogout,
      'getApps': getApps,
      'saveForm': saveForm,
      'getCurrentForm': getCurrentForm,
      'checkIfUsernameTaken': checkIfUsernameTaken,
      'checkIfCustomUrlTaken': checkIfCustomUrlTaken
    };

  });
