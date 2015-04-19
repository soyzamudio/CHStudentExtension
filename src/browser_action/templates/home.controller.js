angular.module('alert')
.controller('HomeController', ['$rootScope', '$scope', '$state', '$firebaseObject', '$timeout', function($rootScope, $scope, $state, $firebaseArray, $timeout) {

  $scope.disabled = false;
  $scope.dinner = '';

  var ref = new Firebase('https://get-ta.firebaseio.com/assistant');
  var TA = $firebaseArray(ref);
  TA.$loaded(function(snapshot) {
    $scope.TA = snapshot;
  })

  $scope.getTA = function(ta) {
    sendNotification(ta);
    var number = Math.floor((Math.random() * 999999) + 1);
    var assistant = new Firebase('https://get-ta.firebaseio.com/assistant/' + ta + '/help');
    assistant.update({student: $rootScope.name, number: number, timestamp: Firebase.ServerValue.TIMESTAMP });
    $scope.disabled = true;

    $timeout(function() {
      $scope.disabled = false;
    }, 30000);
  }

  $scope.foodReady = function(text) {
    var food = new Firebase('https://get-ta.firebaseio.com/food/');
    food.update({dinner: text, timestamp: Firebase.ServerValue.TIMESTAMP});
    $scope.dinner = '';
  }

  $scope.logout = function() {
    chrome.storage.local.clear();
    $state.go('name');
  }

  function sendNotification(ta) {
    var opt = {
      type: "basic",
      title: 'Sit tight',
      message: ta + ' is on his way',
      iconUrl: "../../../icons/icon128.png",
    }
    chrome.notifications.create('assist', opt, function(id) { i++; });
  }
}]);
