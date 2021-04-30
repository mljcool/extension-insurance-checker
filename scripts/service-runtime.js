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

const arrangedClientBenefits = (clients = [], insurers = []) => {
  console.log(`clients`, JSON.stringify(clients));
  console.log(`insurers`, JSON.stringify(insurers));
  const newSet =
    clients.map((data = {}) => {
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

const getClientAndBenefits = ({ $scope }) => {
  setTimeout(() => {
    const clients = $scope.ClientInformGet;
    const insurers = $scope.clientsInsurances;
    $scope.clientsAndBenefits = arrangedClientBenefits(clients, insurers);
    $scope.$apply();
    console.log('$scope.clientsAndBenefits', $scope.clientsAndBenefits);
  }, 200);
};

// SERVICES FOR API

const baseIpAddress = '13.239.1.237';
const baseURL = 'http://' + baseIpAddress + '/';

const postConnectToProvider = ({ $http, details }) => {
  const urlChecker = baseURL + 'setup/set-credential';
  return $http({
    method: 'POST',
    url: urlChecker,
    data: JSON.stringify(details),
  });
};

const getConnectToProvider = ({ $http, browserId }) => {
  const urlChecker = baseURL + 'setup/get-credential';
  return $http.get(urlChecker, {
    params: { browserId },
  });
};
