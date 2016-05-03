angular.module('myApp',[])
      .controller('myApp.cont', ['$scope', function($scope){
        $scope.info = {};
        $scope.info.firstName = '';
        $scope.info.lastName = '';
        $scope.info.phone = '';
        $scope.info.email = '';
        $scope.info.zip = '';
      }])

//rgb(27,203,249) cool blue color I like 