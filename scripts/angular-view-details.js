const app = angular.module('AngularChromeEx', []);

app.controller('viewCampareDetailsCtrl', function($scope) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const getSycnID = urlParams.get('syncID');
  $scope.message = getSycnID;
  console.log(getSycnID);
});
