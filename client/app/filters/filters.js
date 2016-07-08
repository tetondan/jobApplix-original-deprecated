angular.module('myApp.filters', [])
  .filter('applicationFilter', function() {
    return function(appGroup, filteredApp){
      var filtered = []
      for(var i = 0; i < appGroup.length; i++){
        var currentApp = appGroup[i]
        var match = true
        for(var dayTime in filteredApp.availability){
          if(filteredApp.availability[dayTime] === true){
            if(currentApp.availability[dayTime] === undefined){
              match = false
            } else if(currentApp.availability[dayTime] !== filteredApp.availability[dayTime]){
              match = false
            }
          }
        }
        if(match){
          filtered.push(currentApp)
        }
      }
      return filtered
    }
  })