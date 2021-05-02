const viewComaparisonWindow = ({ insurance }) => {
  const { syncID } = insurance;
  const w = 450;
  const h = 850;
  const left = screen.width / 2 - w / 2;
  const top = screen.height / 2 - h / 2;
  chrome.windows.create({
    url: chrome.extension.getURL('insurer-details.html') + '?syncID=' + syncID,
    type: 'panel',
    height: 670,
    width: 470,
    left: left,
    top: top,
  });
};

const triggerResyncOn = () => {
  chrome.notifications.clear('OFF', () => {
    chrome.runtime.sendMessage('', {
      type: 'notification',
      notificationId: 'ON',
      options: notifOptions({
        title: 'Insurance checker is running.',
        message: 'checking all providers for clients.',
      }),
    });
  });
};

const onLoadSyncData = ({ $scope }) => {
  chrome.storage.local.get('sampleCool', function(items) {
    $scope.message = items;
    $scope.$apply();
  });
  chrome.runtime.onMessage.addListener((message) => {
    if (message.senderFrom === 'myCRM') {
      chrome.storage.local.get('sampleCool', function(items) {
        $scope.message = items;
        $scope.$apply();
      });
    }
  });
};

const checkAdviserInforData = ({ $scope }) => {
  chrome.storage.local.get('adviserData', function(items) {
    if (!!items.adviserData) {
      const {
        firstName,
        lastName,
        preferredFullName,
        accessType,
        email,
      } = items.adviserData;

      console.log('adviserData angular', items.adviserData);
      const ACCESS_TYPE = {
        1: 'PRINCIPAL ADVISER',
        2: 'ADVISER',
        3: 'ADMIN ASSISTANT',
        4: 'ASSISTANT',
        5: 'CORPORATE',
        9: 'REFERRER',
      };
      $scope.adviserFirstName = firstName;
      $scope.adviserLastName = lastName;
      $scope.adviserPreferredFullName = preferredFullName;
      $scope.adviserAccessType = ACCESS_TYPE[accessType];
      $scope.adviserEmail = email;
      $scope.$apply();
    }
  });
};

const checkClientInforData = ({ $scope }) => {
  chrome.storage.local.get('ClientInformGet', function(items) {
    if (!!items.ClientInformGet) {
      console.log('ClientInformGet angular', items.ClientInformGet);
      $scope.ClientInformGet = items.ClientInformGet;
      $scope.$apply();
    }
  });
};

const checkClientInsurances = ({ $scope }) => {
  chrome.storage.local.get('clientsInsurances', function(items) {
    if (!!items.clientsInsurances) {
      console.log('clientsInsurances angular', items.clientsInsurances);
      $scope.clientsInsurances = items.clientsInsurances;
      $scope.$apply();
    }
  });
};

const setSyncID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const arrangedClientBenefits = (clients = [], insurers = []) => {
  const newSet =
    clients.map((data = {}, index) => {
      data.myBenefits = insurers.map((benefit = {}) => {
        benefit.ownCover = benefit.benefitDetails.filter(
          (ins = {}) =>
            parseInt(ins.familyClientID) === parseInt(data.personId),
        );
        return benefit;
      });
      data.insurersList = insurers;
      return data;
    }) || [];
  return newSet;
};

const getClientAndBenefits = ({ $scope }) => {
  setTimeout(() => {
    const clients = $scope.ClientInformGet;
    const insurers = $scope.clientsInsurances;
    $scope.clientsAndBenefits = arrangedClientBenefits(clients, insurers)
      .sort()
      .reverse();
    $scope.$apply();
    console.log('$scope.clientsAndBenefits', $scope.clientsAndBenefits);
  }, 200);
};

const checkIsConnected = ({ $scope }, providerName = '') => {
  const checkStatus = $scope.insuranceLoginList.some(
    (provider) =>
      provider.providerNameLowerCases === providerName && provider.isConnected,
  );
  return checkStatus;
};

const setAllConnectedInsurers = ({ $scope, data = [] }) => {
  $scope.listOfConnectedProvider = data;
  data.forEach((statuses) => {
    const foundIndex = $scope.insuranceLoginList.findIndex(
      (x) => x.providerName == statuses.insurerName,
    );
    $scope.insuranceLoginList[foundIndex].isConnected = true;
  });
  setTimeout(() => {
    console.log('$scope.insuranceLoginList', $scope.insuranceLoginList);
    $scope.$apply();
  });
};
