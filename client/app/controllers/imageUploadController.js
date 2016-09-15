angular.module('myApp.imageUploadCont', [])
  .controller('ImageUploadController', function($state, $scope, $rootScope, $timeout, BusinessDataServices){
    $scope.advance = false;
    $scope.continue = function(){
      $state.go('dashboard.setup')
    };
    $scope.thumbnail = {dataUrl: '/no_image.png'};
    $scope.filecallout = function(){
      if($scope.file && $scope.file.size > 2000000) {
        alert('Sorry, file size must be under 2MB');
        return false;
      } else if ($scope.file){
        BusinessDataServices.gets3signature($scope.file)
          .then(function(data){
            BusinessDataServices.s3upload($scope.file, data.signedRequest, data.url)
            .then(function(){
              $scope.advance = true;
            })
          })
      }
    }
});