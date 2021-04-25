chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const callImportants = () => {
    const requestURL = window.location.href;
    getClientInfo(requestURL);
    getInsurances(requestURL);
  };

  switch (true) {
    case request.sendScope === 'getScope':
      console.log('getScope >>>> ');
      // getInsApp(request.tabURL);
      callImportants();
      break;
    case request.message === 'urlChange':
      console.log('urlChange >>>> ');
      callImportants();
      // getInsApp(request.url);
      break;
  }
});

$(function() {
  setTimeout(function() {
    const requestURL = window.location.href;
    getClientInfo(requestURL);
    getInsurances(requestURL);
    setupAdviserInfoRuntime(requestURL);
  }, 2000);
});
