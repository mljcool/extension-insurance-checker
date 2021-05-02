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

    const apply = () => {
      setTimeout(() => {
        $scope.$apply();
      });
    };

    const toggleSyncing = (index, parentIdx) => {
      console.log(
        'openComparison_insurance',
        $scope.clientsAndBenefits[parentIdx],
      );
      $scope.clientsAndBenefits[parentIdx].myBenefits[index].isSync = !$scope
        .clientsAndBenefits[parentIdx].myBenefits[index].isSync;
      apply();
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
        viewComaparisonWindow({ insurance });
      }, 2000);
    };

    $scope.openComparison = ({ insurance, clients }, index, parentIdx) => {
      const { firstName, dateOfBirth, lastName } = clients;
      const { providerName } = insurance;
      const providerNameLowerCase = (providerName || '').toLowerCase();

      // console.log('openComparison_insurance', insurance);
      console.log('openComparison_clients', clients);
      toggleSyncing(index, parentIdx);

      if (
        !$scope.listOfConnectedProvider.length ||
        !checkIsConnected({ $scope }, providerNameLowerCase)
      ) {
        setTimeout(() => {
          toggleSyncing(index, parentIdx);
          $scope.clientsAndBenefits[parentIdx].myBenefits[
            index
          ].isConnected = true;
          apply();
        }, 900);
        return;
      }

      chrome.storage.local.get('chromeId', (items) => {
        if (!!items.chromeId) {
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
              $scope.clientsAndBenefits[parentIdx].myBenefits[
                index
              ].isConnected = true;

              $scope.clientsAndBenefits[parentIdx].myBenefits[index].message =
                `Oops! something went wrong ` + error.statusText;
              apply();
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
        apply();
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
              setAllConnectedInsurers({ $scope, data });
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
