const getRequest = (urlStr, callback) => {
  const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
  const settings = {
    url: urlStr,
    method: 'GET',
    timeout: 0,
    headers: {
      Authorization: 'Bearer ' + (mytime || {}).accessToken.value,
    },
  };
  $.ajax(settings).done(function(response) {
    callback(response);
  });
};

const getInsApp = (requestURL) => {
  const url = requestURL;
  const splitURL = url.split('/');
  if (!!splitURL.length) {
    chrome.storage.local.remove(['clientsInsaApp'], (result) => {
      const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
      console.log('COOOL2 >>>> urlChange', revalidate);
      if (revalidate) {
        const familyID = splitURL[6];
        const url =
          'https://api.sit.mycrm.finance/insurance-application?familyId=' +
          familyID +
          '&isFireAndGeneral=false&policyNumber=&providerId=0&status=In+Progress';
        getRequest(url, (response) => {
          if (response.Succeeded) {
            const clientData = response.Data;
            console.log('clientData from contents', clientData);
            chrome.storage.local.set(
              { clientsInsaApp: response.Data.reverse() },
              function(items) {
                chrome.storage.local.get('clientsInsaApp', function(data) {
                  console.log('data', data);
                });
              },
            );
          }
        });
      }
    });
  }
};

chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('runtime>>>>>>>>> showPageAction', request);
  if (request.sendScope === 'getScope') {
    getInsApp(request.tabURL);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // listen for messages sent from background.js
  console.log('COOOL232323 >>>> urlChange', request);
  if (request.message === 'urlChange') {
    console.log('COOOL1 >>>> urlChange', request);
    getInsApp(request.url);
  }
});
