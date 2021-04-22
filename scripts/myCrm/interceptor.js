const baseURL = 'https://api.nzfsg.co.nz/';

const getRequest = (urlStr) => {
  const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
  const settings = {
    url: urlStr,
    method: 'GET',
    timeout: 0,
    headers: {
      Authorization: 'Bearer ' + (mytime || {}).accessToken.value,
    },
  };
  return $.ajax(settings);
};

const urlSPliter = (requestURL) => {
  const url = requestURL;
  const splitURL = url.split('/');
  return splitURL;
};

const insAppURL = (familyID) => {
  const url =
    'insurance-application?familyId=' +
    familyID +
    '&isFireAndGeneral=false&policyNumber=&providerId=0&status=Existing';
  return url;
};

const setClientInsuranceData = (clientData) => {
  chrome.storage.local.set({
    clientsInsaApp: clientData.reverse(),
  });
};

const getInsApp = (requestURL) => {
  const splitURL = urlSPliter(requestURL);
  if (!!splitURL.length) {
    chrome.storage.local.remove(['clientsInsaApp'], (result) => {
      const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
      if (revalidate) {
        const familyID = splitURL[6];
        const url = insAppURL(familyID);
        getRequest(baseURL + url).done(({ Succeeded, Data }) => {
          console.log('Production API', Data);
          if (Succeeded) {
            setClientInsuranceData(Data);
          }
        });
      }
    });
  }
};

const sendToCRMExtension = (message) => {
  chrome.runtime.sendMessage('', {
    senderFrom: 'myCRM',
    message,
  });
};
