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
  .filter('searchFilter', function() {
    return function(appGroup, searchParams){
      var filtered = []
      for(var i = 0; i < appGroup.length; i++){
        var currentApp = appGroup[i]
        var match = false
        if(searchParams){
          for(var key in currentApp){
            if(typeof currentApp[key] === "string"){
              var lowerCurrentString = currentApp[key].toLowerCase();
              var lowerSearchString = searchParams.toLowerCase();
              if(lowerCurrentString.match(lowerSearchString) !== null){
                match = true;
              }
            }
          }
        } else {
          match = true;
        }
        if(match){
          filtered.push(currentApp)
        }
      }
      return filtered
    }
  })