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
    getSyncDataClient().then((myCRMClient) => {
      $scope.myCRMClient = myCRMClient;
      console.log('details angular', myCRMClient);
      $scope.$apply();
    });

    getSyncDataInsurance(getSycnID).then((myCRMInsurances) => {
      $scope.myCRMInsurance = myCRMInsurances;
      console.log('details angular', myCRMInsurances);
      $scope.$apply();
    });
  },
]);
