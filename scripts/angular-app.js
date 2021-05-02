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

app.controller('pagerCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.message = 'COOL ANGULAR WORKING';
    $scope.isHideProfile = false;
    $scope.doneSetup = false;
    $scope.isGettingStarted = false;
    $scope.hasData = true;
    $scope.insuranceList = [];
    $scope.listOfConnectedProvider = [];

    $scope.gettingStarted = () => {
      $scope.isGettingStarted = !$scope.isGettingStarted;
    };

    $scope.toggleProfile = () => {
      $scope.isHideProfile = !$scope.isHideProfile;
    };

    const toggleSyncing = (index, parentIdx) => {
      console.log(`indexes`, $scope.clientsAndBenefits[parentIdx].myBenefits);
      $scope.clientsAndBenefits[parentIdx].myBenefits[index].isSync = !$scope
        .clientsAndBenefits[parentIdx].myBenefits[index].isSync;
    };
    /* 

    when trigger openComparison then
    1). CallAPI endpoint for scraping data from API.then((syncID) => {}) 

    2).for API ASK for Sync endpoint after intercepting data from scraping 
      w/c be handle by new pop-up window to call the endpoint viewComaparisonWindow
    e.g 
    https://insurance-checker/syncID=123456
  */

    const whenSuccessCompare = ({ insurance }, index, parentIdx) => {
      setTimeout(() => {
        toggleSyncing(index, parentIdx);
        $scope.$apply();
        viewComaparisonWindow({ insurance });
      }, 2000);
    };

    $scope.openComparison = ({ insurance, clients }, index, parentIdx) => {
      console.log(index);
      console.log(parentIdx);
      toggleSyncing(index, parentIdx);

      if (!$scope.listOfConnectedProvider.length) {
        setTimeout(() => {
          toggleSyncing(index, parentIdx);
          $scope.clientsAndBenefits[parentIdx].myBenefits[
            index
          ].isConnected = true;
          $scope.$apply();
        }, 1000);
        return;
      }

      chrome.storage.local.get('chromeId', (items) => {
        if (!!items.chromeId) {
          const { firstName, dateOfBirth, lastName } = clients;
          const { providerName } = insurance;
          const providerNameLowerCase = (providerName || '').toLowerCase();
          const queries = {
            birthday: dateOfBirth,
            lastName,
            firstName,
            insurerName: providerNameLowerCase,
            browserId: items.chromeId,
          };

          getCompareToProvider({ $http, queries }).then(
            (data) => {
              console.log('SUCCESS', data);
              whenSuccessCompare({}, index, parentIdx);
            },
            (error) => {
              console.log('ERROR', error);
            },
          );
        }
      });
    };

    $scope.isResync = false;
    $scope.resyncData = () => {
      $scope.isResync = true;
      triggerResyncOn();
      setTimeout(() => {
        getScopeFromPage();
        clearStatusNotifications();
      }, 500);
    };

    $scope.connectToProvider = (type, data, idx) => {
      console.log(data);
      const { username, password, providerName, id } = data || {};
      if (!username || !password) {
        $scope.insuranceLoginList[idx].message =
          'Please make sure to provide username or password';

        return;
      }
      $scope.insuranceLoginList[idx].message = '';
      $scope.insuranceLoginList[idx].isSyncing = true;

      const resetForms = () => {
        $scope.insuranceLoginList[idx].isSyncing = false;
        $scope.insuranceLoginList[idx].isConnected = true;
        $scope.insuranceLoginList[idx].username = '';
        $scope.insuranceLoginList[idx].password = '';
        $scope.$apply();
      };

      chrome.storage.local.get('chromeId', (items) => {
        if (!!items.chromeId) {
          const details = {
            Username: username,
            Password: password,
            InsurerName: providerName,
            InsurerId: id,
            BrowserId: items.chromeId,
          };
          postConnectToProvider({ $http, details }).then(
            (success) => {
              console.log('SUCCESS', success);
              resetForms();
            },
            (error) => {
              console.log('ERROR', error);
              resetForms();
            },
          );
        }
      });
    };

    // onLoadSyncData({ $scope });

    chrome.storage.local.get('chromeId', (items) => {
      if (!!items.chromeId) {
        const browserId = items.chromeId;
        getConnectToProvider({ $http, browserId }).then(
          ({ data, status }) => {
            console.log('SUCCESS', data);
            if (!!data.length && status === 200) {
              $scope.listOfConnectedProvider = data;
              $scope.$apply();
            }
          },
          (error) => {
            console.log('ERROR', error);
          },
        );
      }
    });

    checkAdviserInforData({ $scope });
    checkClientInforData({ $scope });
    checkClientInsurances({ $scope });
    getClientAndBenefits({ $scope });
    $scope.insuranceLoginList = sampleInsuranceLis;
    $scope.listOFClientInsurances = listOFClientInsurances;
  },
]);
