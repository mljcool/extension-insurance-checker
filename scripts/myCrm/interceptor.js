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
