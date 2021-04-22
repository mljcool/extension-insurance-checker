chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (true) {
    case request.sendScope === 'getScope':
      console.log('getScope >>>> ');
      // getInsApp(request.tabURL);
      sendToCRMExtension('getScope');
      chrome.storage.local.set({
        sampleCool: 'getScope',
      });
      break;
    case request.message === 'urlChange':
      console.log('urlChange >>>> ');
      sendToCRMExtension('urlChange');
      // getInsApp(request.url);
      chrome.storage.local.set({
        sampleCool: 'urlChange',
      });
      break;
  }
});
