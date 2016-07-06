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