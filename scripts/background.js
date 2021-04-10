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
