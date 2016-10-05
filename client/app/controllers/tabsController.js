angular.module('myApp.tabs', [])
  .controller('TabsController', function($state, $scope, $rootScope, customTemplate, BusinessDataServices){
    $scope.filterObject = {
      availability: {}
    }
    $scope.searchParams = '';
    $scope.updated = false;
    $scope.customTemplate = customTemplate.data[0];
    $scope.businessData = $rootScope.businessData
    $scope.filterExpand = false;
    $scope.isUsernameTaken = false;
    $scope.isCustomUrlTaken = false;
    $scope.noMatch = false;
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
    $scope.uploading = false;
    $scope.thumbnail = {dataUrl: '/no_image.png'};
    $scope.fileUpload = function(){
      if($scope.file && $scope.file.size > 2000000) {
        alert('Sorry, file size must be under 2MB');
        return false;
      } else if ($scope.file){
        $scope.uploading = true;
        BusinessDataServices.gets3signature($scope.file)
          .then(function(data){
            BusinessDataServices.s3upload($scope.file, data.signedRequest, data.url)
            .then(function(){
              $scope.uploading = false;
              $scope.advance = true;
              $scope.businessData.iconURL = $scope.businessData.iconURL + "?r=" + (Math.random() * 10 | 0)
            })
          })
      }
    }
    $scope.updateBusinessInfo = function(){
      $scope.updating = true;
      BusinessDataServices.updateBusinessInfo($scope.businessData)
        .then(function(data){
          $scope.updating = false;
          $scope.updated = true;
        })
    }
    $scope.checkUserName = function(){
      if($scope.businessData.username == undefined) {return $scope.isUsernameTaken = false};
      BusinessDataServices.checkIfUsernameTaken($scope.businessData.username)
        .then(function(data){
          if(data){
            $scope.isUsernameTaken = true;
            $scope.businessData.username = ''
          } else {
            $scope.isUsernameTaken = false;
          }
        })
    }

    $scope.checkCustomUrl = function(){
      if($scope.businessData.customUrl == undefined) {return $scope.isCustomUrlTaken = false};
      BusinessDataServices.checkIfCustomUrlTaken($scope.businessData.customUrl)
        .then(function(data){
          if(data){
            $scope.isCustomUrlTaken = true;
            $scope.businessData.customUrl = ''
          } else {
            $scope.isCustomUrlTaken = false;
          }
        })
    }

    $scope.passwordsMatch = function(){
      if($scope.business.password !== $scope.confirmPassword){
        $scope.confirmPassword = '';
        $scope.noMatch = true; 
      } else {
        $scope.noMatch = false;
        $scope.rejectedPassword = {};
      }
    }
    $scope.refreshApps = function(){
      $scope.toggleSidebar();
      BusinessDataServices.getApps()
        .then(function(data){
          setTimeout(function(){
            $scope.apps = data;
            $('#refreshModal').modal('hide');
          }, 1000);
        })
    }
    $scope.closeProfile = function(){ $scope.updated = false;};
    $('[data-toggle="logoTooltip"]').tooltip();
  })