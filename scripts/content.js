chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('>>>>>>>>> showPageAction', request);
  if (request.sendScope === 'getScope') {
    $('.ioff-stuck').css('color', 'green');

    const url = request.tabURL;
    const splitURL = url.split('/');

    if (!!splitURL.length) {
      const revalidate = splitURL.includes('contacts') && splitURL.length >= 5;
      if (revalidate) {
        const familyID = splitURL[6];
        const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
        const settings = {
          url:
            'https://api.sit.mycrm.finance/contacts/ClientInformGet?familyId=' +
            familyID,
          method: 'GET',
          timeout: 0,
          headers: {
            Authorization: 'Bearer ' + (mytime || {}).accessToken.value,
          },
        };

        $.ajax(settings).done(function(response) {
          console.log(response);
          chrome.storage.sync.set({ clients: response }, function() {
            console.log('Value is set to ' + response);
          });
        });
      }
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'urlChange') {
    console.log(request.url); // new url is now in content scripts!
  }
});
