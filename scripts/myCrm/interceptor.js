const urlSPliter = (requestURL) => {
  const url = requestURL;
  const splitURL = url.split('/');
  return splitURL;
};

const setClientInsuranceData = (clientData) => {
  chrome.storage.local.set({
    clientsInsaApp: clientData.reverse(),
  });
};

const sendToCRMExtension = (message) => {
  chrome.runtime.sendMessage('', {
    senderFrom: 'myCRM',
    message,
  });
};

const getInsApp = (requestURL) => {
  const splitURL = urlSPliter(requestURL);
  if (!!splitURL.length) {
    chrome.storage.local.remove(['clientsInsaApp'], (result) => {
      const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
      if (revalidate) {
        const familyID = splitURL[6];
        const url = existingInsuranceURL(familyID);
        getRequest(url).done(({ Succeeded, Data }) => {
          console.log('Production API', Data);
          if (Succeeded) {
            setClientInsuranceData(Data);
          }
        });
      }
    });
  }
};

// adivserInfo Section
const setupAdviserInfoStorage = (setInfo) => {
  chrome.storage.local.set({
    adviserData: setInfo,
  });
};

const setupAdviserInfoRuntime = () => {
  getRequest(userInfo()).done((response) => {
    const setInfo = mapAdviserInfo(response);
    chrome.storage.sync.get('adviserData', function(items) {
      if (!!items.adviserData) {
        if (items.adviserData.clientId !== setInfo.clientId) {
          setupAdviserInfoStorage(setInfo);
        }
      } else {
        setupAdviserInfoStorage(setInfo);
      }
    });
    console.log('setupAdviserInfoRuntime API', setInfo);
  });
};
