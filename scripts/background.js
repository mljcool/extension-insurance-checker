chrome.runtime.onMessage.addListener((data) => {
  if (data.type === 'notification') {
    chrome.notifications.create(data.notificationId, data.options);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('>>>>>>>>>', request);
  if (request.todo == 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});

chrome.webRequest.onCompleted.addListener(
  function(details) {
    // Process the XHR response.
    console.log('>>>>>>>>> webRequest', details);
  },
  {
    urls: [
      'https://sit-mycrm.nzfsg.co.nz/*',
      'https://sit-mycrm.loanmarket.com.au/*',
    ],
  },
);
