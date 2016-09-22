angular.module('myApp.tabs', [])
  .controller('TabsController', function($state, $scope, $rootScope, customTemplate, BusinessDataServices){
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
    $scope.getBusinessInfo = function(){
      BusinessDataServices.getBusinessInfo()
        .then(function(data){
          if($scope.businessData === undefined){
            $scope.businessData = data;
            if(data.iconURL === undefined){
              $scope.businessData.iconURL = "/NoLogo.jpg";
            }
          }          
        })
    }
    $scope.logout = function(){
      BusinessDataServices.businessLogout()
      .then(function(){
        $state.go('home')
      })
    }
  })