angular.module('myApp.tabs', [])
  .controller('TabsController', function($scope, $rootScope, customTemplate){
    $scope.filterObject = {
      availability: {}
    }
    $scope.loggit = function(event){
      console.log($scope.filterObject)
    }
    $scope.customTemplate = customTemplate.data[0];
    $scope.businessData = $rootScope.businessData
    $scope.filterExpand = false;
    $scope.chosen = {
      new: true
    }
    $scope.choose = function(event, group){
      $('.active').removeClass('active')
      $(event.currentTarget).addClass('active')
      $scope.chosen = {}
      $scope.chosen[group] = true
    }
  })