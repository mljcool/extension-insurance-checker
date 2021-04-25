chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('>>>>>>>>>>> injector', request);
  switch (true) {
    case request.sendScope === 'getScope':
      console.log('getScope >>>> ');
      // getInsApp(request.tabURL);
      sendToCRMExtension('getScope');
      break;
    case request.message === 'urlChange':
      console.log('urlChange >>>> ');
      sendToCRMExtension('urlChange');
      // getInsApp(request.url);
      break;
  }
});

$(function() {
  setTimeout(function() {
    const requestURL = window.location.href;
    getClientInfo(requestURL);
    getInsApp(requestURL);
    setupAdviserInfoRuntime(requestURL);
  }, 2000);
});
