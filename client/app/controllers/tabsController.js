angular.module('myApp.tabs', [])
  .controller('TabsController', function($scope, customTemplate){
    $scope.customTemplate = customTemplate.data[0];
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