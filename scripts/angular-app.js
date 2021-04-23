var app = angular.module('AngularChromeEx', []);

app.config([
  '$compileProvider',
  function($compileProvider) {
    // ...
    $compileProvider.imgSrcSanitizationWhitelist(
      /^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/,
    );
  },
]);

app.controller('pagerCtrl', function($scope) {
  $scope.message = 'COOL ANGULAR WORKING';
  $scope.isHideProfile = false;
  $scope.doneSetup = false;
  $scope.isGettingStarted = false;
  $scope.hasData = true;
  $scope.insuranceList = [];

  const toggleSyncing = (parentIdx, childIdx) => {
    $scope.listOFClientInsurances[parentIdx].insurances[
      childIdx
    ].isSync = !$scope.listOFClientInsurances[parentIdx].insurances[childIdx]
      .isSync;
  };

  $scope.openComparison = (
    { clientInsurance, insurance },
    parentIdx,
    childIdx,
  ) => {
    toggleSyncing(parentIdx, childIdx);
    setTimeout(() => {
      toggleSyncing(parentIdx, childIdx);
      $scope.$apply();
      // viewComaparisonWindow(data);
    }, 5000);
  };

  const arrayReverseObj = (obj) => {
    let newArray = [];

    Object.keys(obj)
      .sort()
      .reverse()
      .forEach((key, index) => {
        console.log(key);
        newArray.push({
          key: key,
          id: index,
          insurers: obj[key],
          clientDetails: obj[key][0],
        });
      });

    console.log(newArray);
    return newArray;
  };

  $scope.getClientData = () => {
    setTimeout(() => {
      chrome.storage.local.get('clientsInsaApp', function(items) {
        if (!!items) {
          $scope.hasData = true;
          $scope.isResync = false;
          const insuranceList = (items.clientsInsaApp || []).reduce(function(
            r,
            a,
          ) {
            r[a.InvitedClientID] = r[a.InvitedClientID] || [];
            r[a.InvitedClientID].push(a);
            return r;
          },
          Object.create(null));
          $scope.insuranceList = arrayReverseObj(insuranceList);
          console.log('scopescopescope clientsInsaApp', $scope.insuranceList);
        } else {
          $scope.hasData = false;
        }

        $scope.$apply();
      });
    }, 500);
  };

  $scope.isResync = false;
  $scope.resyncData = () => {
    $scope.isResync = true;
    triggerResyncOn();
    $scope.getClientData();
    setTimeout(() => {
      getScopeFromPage();
      clearStatusNotifications();
    }, 500);
  };

  // onLoadSyncData({ $scope });

  $scope.gettingStarted = () => {
    $scope.isGettingStarted = !$scope.isGettingStarted;
  };

  $scope.toggleProfile = function() {
    $scope.isHideProfile = !$scope.isHideProfile;
  };
  $scope.getClientData();

  $scope.insuranceLoginList = sampleInsuranceLis;
  $scope.listOFClientInsurances = listOFClientInsurances;
});
