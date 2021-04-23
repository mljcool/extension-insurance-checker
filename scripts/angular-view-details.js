var app = angular.module('AngularChromeEx', []);

app.controller('viewCampareDetailsCtrl', function($scope) {
  chrome.runtime.onMessage.addListener((message) => {
    $scope.message = message;
    $scope.$apply();
    console.log('coool');
    if (message.type === 'a_message_type') {
      $scope.message = message.foo;
      $scope.$apply();
    } else {
      $scope.message = message;
      $scope.$apply();
    }
  });
});
