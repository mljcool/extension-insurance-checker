const urlSPliter = (requestURL) => {
  const url = requestURL;
  const splitURL = url.split('/');
  return splitURL;
};

const sendToCRMExtension = (message) => {
  chrome.runtime.sendMessage('', {
    senderFrom: 'myCRM',
    message,
  });
};

// getClientInfo Section

const setupClientInfoStorage = (setInfo) => {
  chrome.storage.local.set({
    ClientInformGet: setInfo,
  });
};

const getClientInfo = (requestURL) => {
  const splitURL = urlSPliter(requestURL);
  if (!!splitURL.length) {
    const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
    if (revalidate) {
      const familyID = splitURL[6];
      const url = getClientInfoURL(familyID);
      getRequest(url).done((response) => {
        if (!!response.length) {
          const clientInfo = mapClientsInfo(response);
          setupClientInfoStorage(clientInfo);
          console.log('getClientInfoURL API', clientInfo);
        }
      });
    }
  }
};

// insurances Section
const setClientInsuranceStorage = (clientData) => {
  chrome.storage.local.set({
    clientsInsurances: clientData,
  });
};

const getInsurances = (requestURL) => {
  const splitURL = urlSPliter(requestURL);
  if (!!splitURL.length) {
    const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
    if (revalidate) {
      const familyID = splitURL[6];
      const url = existingInsuranceURL(familyID);
      getRequest(url).done(({ Succeeded, Data }) => {
        if (Succeeded) {
          const insurances = mapClientsInsurance(Data);
          setClientInsuranceStorage(insurances.sort().reverse());
          console.log('existingInsuranceURL API', insurances);
        }
      });
    }
  }
};

// adivserInfo Section
const setupAdviserInfoStorage = (setInfo) => {
  chrome.storage.local.set({
    adviserData: setInfo,
  });
};

const setupAdviserInfoRuntime = (requestURL) => {
  const splitURL = urlSPliter(requestURL);
  const revalidateURL = !!splitURL.find((url) => url.includes('#'));
  if (!!splitURL.length && revalidateURL) {
    const url = userInfo();
    getRequest(url).done((response) => {
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
  }
};
