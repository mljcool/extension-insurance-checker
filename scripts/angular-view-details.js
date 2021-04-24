const app = angular.module('AngularChromeEx', []);

app.config([
  '$compileProvider',
  function($compileProvider) {
    // ...
    $compileProvider.imgSrcSanitizationWhitelist(
      /^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/,
    );
  },
]);

app.controller('viewCampareDetailsCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const getSycnID = urlParams.get('syncID');
    $scope.message = getSycnID;
    $scope.myCRMClient = {};
    $scope.myCRMInsurance = {};
    $scope.syncData = {};
    getSyncData().then(({ myCRMClient, myCRMInsurance, syncData }) => {
      console.log(myCRMInsurance);
      $scope.myCRMClient = myCRMClient;
      $scope.myCRMInsurance = myCRMInsurance;
      $scope.syncData = syncData;
      $scope.$apply();
    });
  },
]);
