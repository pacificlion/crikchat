angular.module('starter.controllers', [])

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('ChatCtrl', function($scope, $state, $ionicPopup) {
 
  //$scope.messages = Messages;
 
  $scope.addMessage = function() {
 
   $ionicPopup.prompt({
     title: 'Need to get something off your chest?',
     template: 'Let everybody know!'
   }).then(function(res) {
      // $scope.messages.$add({
      //   "message": res
      // });
   });
  };
 
  $scope.logout = function() {
    // var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    // ref.unauth();
    // $state.go('login');
  };
 
})
.controller('PageCtrl', function($scope, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, $http) {
  var messageOptions = [
    { content: '<p>Hi! I am crickBot !</p>' },
  ];
  $scope.messages = messageOptions.slice(0, messageOptions.length);
  $scope.newmsg="";
 function serverCall(msg){
  var apiEndpoint ='https://api.projectoxford.ai/luis/v2.0/apps/b4209f2f-bffc-49d2-a0bf-d45c366a64d9?subscription-key=72fde056e3324f07a070a4b581dc8fb2&verbose=true';
   $http.get(apiEndpoint,{params:{'q':msg}}).then(function(response) {
        if (response.status === 200) {
          console.log(response);
          if(response.data !=null)
          var nextmsg = response.data.topScoringIntent.intent;
          //console.log(nextmsg);
          var nextMessage = { content: '<p>'+nextmsg+'</p>' };
          $scope.messages.push(angular.extend({}, nextMessage));
          console.log("added message");
          $ionicFrostedDelegate.update();
          $ionicScrollDelegate.scrollBottom(true);
              }
      });
    // $http({
    //            method  : 'POST',
    //            url     : 'http://'+hostserver+':9000/bookorder',
    //          //  url     : 'http://localhost:9000/bookorder',
    //            data    : $rootScope.cartItems, //forms user object
    //            headers : {'Content-Type': 'application/json'} 
    //                       })
    //          .success(function(data){

    //          })
 }
  var messageIter = 0;
  $scope.add = function() {
    if($scope.newmsg=="") return;
    var sendMessage = { content: '<p>'+$scope.newmsg+'</p>' };
    $scope.messages.push(angular.extend({}, sendMessage));
    serverCall($scope.newmsg);
    $scope.newmsg="";
    console.log("added message1");
    // Update the scroll area and tell the frosted glass to redraw itself
    $ionicFrostedDelegate.update();
    $ionicScrollDelegate.scrollBottom(true);
  };
});
