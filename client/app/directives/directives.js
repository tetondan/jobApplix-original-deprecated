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
