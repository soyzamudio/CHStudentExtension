angular.module('background', ['firebase'])
.controller('BackgroundController', ['$rootScope', '$firebaseObject', function($rootScope, $firebaseObject) {
  var ref = new Firebase('https://get-ta.firebaseio.com/food/dinner');
  var i = 0;
  ref.on("value", function(snapshot) {
    var opt = {
      type: "basic",
      title: 'Dinner is ready!',
      message: snapshot.val(),
      iconUrl: "../../icons/icon128.png"
    }
    console.log(opt);
    chrome.notifications.create('notify' + i, opt, function(id) { i++; });
  });
}]);
