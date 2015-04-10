angular.module('alert')
.controller('NameController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
  $scope.username = null;
  $scope.setName = function() {
    chrome.storage.local.set({'name': $scope.username}, function() {
      $rootScope.name = $scope.username;
      $state.go('home');
    });
  }
}]);
