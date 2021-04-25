const viewComaparisonWindow = (data) => {
  const w = 450;
  const h = 850;
  const left = screen.width / 2 - w / 2;
  const top = screen.height / 2 - h / 2;
  chrome.windows.create({
    url:
      chrome.extension.getURL('insurer-details.html') + '?syncID=' + '3123125',
    type: 'panel',
    height: 650,
    width: 450,
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
