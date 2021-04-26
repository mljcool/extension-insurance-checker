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

  const toggleSyncing = (idx) => {
    $scope.clientsInsurances[idx].isSync = !$scope.clientsInsurances[idx]
      .isSync;
  };
  /* 

    when trigger openComparison then
    1). CallAPI endpoint for scraping data from API.then((syncID) => {}) 

    2).for API ASK for Sync endpoint after intercepting data from scraping 
      w/c be handle by new pop-up window to call the endpoint viewComaparisonWindow
    e.g 
    https://insurance-checker/syncID=123456
  */

  $scope.openComparison = ({ insurance }, parentIdx) => {
    console.log(insurance);
    toggleSyncing(parentIdx);
    setTimeout(() => {
      toggleSyncing(parentIdx);
      $scope.$apply();
      viewComaparisonWindow({ insurance });
    }, 2000);
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

  $scope.connectToProvider = (type, data, idx) => {
    console.log(data);
    const { username, password } = data;
    if (!username || !password) {
      $scope.insuranceLoginList[idx].message =
        'Please make sure to provide username or password';

      return;
    }
    $scope.insuranceLoginList[idx].message = '';
    $scope.insuranceLoginList[idx].isSyncing = true;
    setTimeout(() => {
      $scope.insuranceLoginList[idx].isSyncing = false;
      $scope.insuranceLoginList[idx].isConnected = true;
      $scope.insuranceLoginList[idx].username = '';
      $scope.insuranceLoginList[idx].password = '';
      $scope.$apply();
    }, 3000);
  };

  // onLoadSyncData({ $scope });

  $scope.gettingStarted = () => {
    $scope.isGettingStarted = !$scope.isGettingStarted;
  };

  $scope.toggleProfile = function() {
    $scope.isHideProfile = !$scope.isHideProfile;
  };
  checkAdviserInforData({ $scope });
  checkClientInforData({ $scope });
  checkClientInsurances({ $scope });
  // $scope.getClientData();

  $scope.insuranceLoginList = sampleInsuranceLis;
  $scope.listOFClientInsurances = listOFClientInsurances;
});
