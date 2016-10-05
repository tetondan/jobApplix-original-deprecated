angular.module('myApp.directives', ['myapp.appDataServices'])
  .directive('jaApplications', function(){
    return {
      scope: {
        group: '=group'
      },
      templateUrl: 'app/templates/dashboard/applicationPreview.html',
      controller: function($scope, $state, AppDataServices, BusinessDataServices){
        $scope.customTemplate = $scope.$parent.customTemplate;
        $scope.changeGroup = function(id, newGroup){
          AppDataServices.updateApplicationGroup(id, newGroup)
            .then(function(data){
              $state.reload()
            });
        }
        $scope.addComment = function(groupIndex, appId, comment){
          console.log("HEREREERE", $scope.group[groupIndex]);
          var newComment = {}
          newComment.date = new Date();
          newComment.comment = comment;
          $scope.group[groupIndex].businessComments.unshift(newComment)
          AppDataServices.updateComments(appId, $scope.group[groupIndex].businessComments)
            .then(function(data){
              console.log(data)
            })
        }
      }
    }
  })
  .directive('shiftTimepicker', function(){
    return {
      scope: {
        startOrEnd: '=startOrEnd',
        shift: '=shift'
      },
      templateUrl: 'app/templates/dashboard/shiftTimePicker.html'
    }
  })
  .directive('file', function($timeout) {
    return {
      restrict: 'AE',
      scope: {
        file: '@'
      },
      link: function(scope, el, attrs){
        el.bind('change', function(event){
          var files = event.target.files;
          var file = files[0];
          scope.file = file;
          scope.$parent.file = file;
          scope.fileReaderSupported = window.FileReader != null;
          if (scope.file != null) {
            var file = scope.file;
            if (scope.fileReaderSupported && scope.file.type.indexOf('image') > -1) {
              $timeout(function() {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(scope.file);
                fileReader.onload = function(e) {
                    $timeout(function(){
                      scope.$parent.thumbnail.dataUrl = e.target.result;
                    });
                }
              })
            }
          }  
          scope.$apply();
        });
      }
    };
  })
  .directive('appDirective0', function(){
    return {
      templateUrl: 'app/templates/application/app0.html'
    }
  })
  .directive('appDirective1', function(){
    return {
      templateUrl: 'app/templates/application/app1.html'
    }
  })
  .directive('appDirective2', function(){
    return {
      templateUrl: 'app/templates/application/app2.html'
    }
  })
  .directive('appDirective3', function(){
    return {
      templateUrl: 'app/templates/application/app3.html'
    }
  })
  .directive('appDirective4', function(){
    return {
      templateUrl: 'app/templates/application/app4.html'
    }
  })
  .directive('appDirective5', function(){
    return {
      templateUrl: 'app/templates/application/app5.html'
    }
  })
  .directive('appDirective6', function(){
    return {
      templateUrl: 'app/templates/application/app6.html'
    }
  })
  .directive('appDirective7', function(){
    return {
      templateUrl: 'app/templates/application/app7.html'
    }
  })
  .directive('appDirective8', function(){
    return {
      templateUrl: 'app/templates/application/app8.html'
    }
  })
  .directive('appDirective9', function(){
    return {
      templateUrl: 'app/templates/application/app9.html'
    }
  })
  .directive('appDirective10', function(){
    return {
      templateUrl: 'app/templates/application/app10.html'
    }
  })
