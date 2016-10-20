angular.module('myApp.businessDashBoard', [])
  .controller('BusinessDashboard', function($state, $scope, $rootScope, applications, BusinessDataServices){
    //all business info gathered once successfully logged in.
    $scope.apps = applications;
    $scope.controls = {}
    $scope.application;
    //TODO call a get on the current custom application and apply it to the checkboxes
    $scope.getCurrentForm = function(){
      BusinessDataServices.getCurrentForm()
        .then( function (data) {
          if(data.data.length === 0){
            $scope.application = {
              basicInfo: true
            }
          } else {
            $scope.application = data.data[0];
          }
        })
    }

    $scope.saveForm = function(){
      $scope.application.firstTime = true;
      BusinessDataServices.saveForm($scope.application)
      .then( function (data) {
        $state.go('dashboard.tabs')
      })
    }
    $scope.toggleSidebar = function(){
      var $sidebar = $('#sidebarId')
      if($sidebar.hasClass('sidebar-toggle')){
        $sidebar.removeClass('sidebar-toggle')
      } else {
        $sidebar.addClass('sidebar-toggle')
      }
    }
  })