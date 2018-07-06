angular.module('myApp.signupCont', [])
  .controller('SignupController', function($state, $scope, BusinessDataServices){
    $scope.form = {};

    $scope.business = {};
    $scope.business.username = '';
    $scope.business.customUrl = '';
    $scope.business.password = '';
    $scope.business.name = '';
    $scope.business.address = '';
    $scope.business.phone = '';
    $scope.business.website = 'http://';
    $scope.business.email = '';
    $scope.business.about = '';

    $scope.confirmPassword = '';
    $scope.isUsernameTaken = false;
    $scope.isCustomUrlTaken = false;
    $scope.noMatch = false;

    $scope.paymentAdvance = false;
    $scope.paymentMonth = '';
    $scope.paymentYear = '';
    $scope.length = '';
    $scope.price = 3999;

    $scope.businessId = '';
    $scope.processing = false;

    $scope.checkUserName = function(){
      if($scope.business.username == undefined) {return $scope.isUsernameTaken = false};
      BusinessDataServices.checkIfUsernameTaken($scope.business.username)
        .then(function(data){
          if(data){
            $scope.isUsernameTaken = true;
            $scope.business.username = ''
          } else {
            $scope.isUsernameTaken = false;
          }
        })
    }

    $scope.checkCustomUrl = function(){
      if($scope.business.customUrl == undefined) {return $scope.isCustomUrlTaken = false};
      BusinessDataServices.checkIfCustomUrlTaken($scope.business.customUrl)
        .then(function(data){
          if(data){
            $scope.isCustomUrlTaken = true;
            $scope.business.customUrl = ''
          } else {
            $scope.isCustomUrlTaken = false;
          }
        })
    }

    $scope.confirmPassword = {};
    $scope.passwordsMatch = function(){
      if($scope.business.password !== $scope.confirmPassword.confirmPassword){
        $scope.confirmPassword = {confirmPassword: ''};
        $scope.noMatch = true; 
      } else {
        $scope.noMatch = false;
        $scope.rejectedPassword = {};
      }
    }

    $scope.businessSignUp = function(){
      $scope.passwordsMatch();
      $scope.checkCustomUrl();
      $scope.checkUserName();
      if(!$scope.isCustomUrlTaken && !$scope.isUsernameTaken && !$scope.noMatch){
        BusinessDataServices.businessSignup($scope.business)
          .then( res => {
            $scope.businessId = res.data._id;
            $scope.paymentAdvance = true;
          })
      };
    };

    $scope.selectMonth = function(){
      $scope.paymentYear = '';
      $scope.paymentMonth = 'payment-selected';
      $scope.length = 'month'
      $scope.price = 3999;
    }

    $scope.selectYear = function(){
      $scope.paymentYear = 'payment-selected';
      $scope.paymentMonth = '';
      $scope.length = 'year'
      $scope.price = 29999;
    }

    var handler = StripeCheckout.configure({
      key: 'pk_test_g6do5S237ekq10r65BnxO6S0',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        $scope.processing = true;
        BusinessDataServices.sendStripeToken(token.id, $scope.price, $scope.length, $scope.businessId)
          .then( function(){
            $state.go('dashboard.imageupload')
          })
      }
    })

    $scope.openStripe = function(){
      handler.open({
        name: 'JobApplix.com',
        description: 'Subscription',
        zipCode: true,
        email: false,
        amount: $scope.price
      });
    }
  })