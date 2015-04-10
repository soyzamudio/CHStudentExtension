angular.module('alert')
.controller('HomeController', ['$rootScope', '$scope', '$state', '$firebaseObject', function($rootScope, $scope, $state, $firebaseArray) {
  var ref = new Firebase('https://get-ta.firebaseio.com/assistant');
  var TA = $firebaseArray(ref);
  TA.$loaded(function(snapshot) {
    $scope.TA = snapshot;
  })

  $scope.dinner = '';

  $scope.getTA = function(ta) {
    var number = Math.floor((Math.random() * 999999) + 1);
    var assistant = new Firebase('https://get-ta.firebaseio.com/assistant/' + ta + '/help');
    assistant.update({student: $rootScope.name, number: number });
  }

  $scope.foodReady = function(text) {
    var food = new Firebase('https://get-ta.firebaseio.com/food/');
    food.update({dinner: text});
  }

  $scope.logout = function() {
    chrome.storage.local.clear();
    $state.go('name');
  }
}]);
