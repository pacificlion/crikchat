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
.directive('quiz', function(quizFactory) {
  return {
    restrict: 'AE',
    scope: {},
    templateUrl: 'templates/quiztemplate.html',
    link: function(scope, elem, attrs) {
      scope.start = function() {
        scope.id = 0;
        scope.quizOver = false;
        scope.inProgress = true;
        scope.getQuestion();
      };

      scope.reset = function() {
        scope.inProgress = false;
        scope.score = 0;
      }

      scope.getQuestion = function() {
        var q = quizFactory.getQuestion(scope.id);
        if(q) {
          scope.question = q.question;
          scope.options = q.options;
          scope.answer = q.answer;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };

      scope.checkAnswer = function() {
        if(!$('input[name=answer]:checked').length) return;

        var ans = $('input[name=answer]:checked').val();

        if(ans == scope.options[scope.answer]) {
          scope.score++;
          scope.correctAns = true;
        } else {
          scope.correctAns = false;
        }

        scope.answerMode = false;
      };

      scope.nextQuestion = function() {
        scope.id++;
        scope.getQuestion();
      }

      scope.reset();
    }
  }
})
.factory('quizFactory', function() {
  var questions = [
    {
      question: "During bowling action, Bowlers' arm must not extend(bend) above which degree?",
      options: ["15", "5", "4", "10"],
      answer: 0
    },
    {
      question: "Which Cricketer is known as 'THE WALL'?",
      options: ["Sourav Ganguly", "Rahul Dravid", "Sachin Tendulkar", "Virat Kohli"],
      answer: 1
    },
    {
      question: "The second bouncer in the same over is considered?",
      options: ["No Ball", "Wide Ball", "Wrong Ball", "Normal Ball"],
      answer: 0
    },
    {
      question: "Which country won the 2007 ICC T20 World Cup?",
      options: ["Sri Lanka", "Australia", "India", "Kenya"],
      answer: 2
    },
    { 
      question: "First batsman to hit six on first ball of Test Match?",
      options: ["Chris Gayle", "Sourav Ganguly", "M S Dhoni", "Virendra Sehwag"],
      answer: 0
    }
  ];

  return {
    getQuestion: function(id) {
      if(id < questions.length) {
        return questions[id];
      } else {
        return false;
      }
    }
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
  var apiEndpoint ='http://821c6a1a.ngrok.io/luis/';
  // var apiEndpoint ='https://api.projectoxford.ai/luis/v2.0/apps/b4209f2f-bffc-49d2-a0bf-d45c366a64d9?subscription-key=72fde056e3324f07a070a4b581dc8fb2&verbose=true';
   $http.get(apiEndpoint,{params:{'q':msg}}).then(function(response) {
        if (response.status === 200) {
          console.log(response);
          if(response.data !=null)
          // var nextmsg = response.data.topScoringIntent.intent;
        var nextmsg = response.data;
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
