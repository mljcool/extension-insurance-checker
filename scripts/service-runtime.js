const viewComaparisonWindow = (data) => {
  const w = 450;
  const h = 850;
  const left = screen.width / 2 - w / 2;
  const top = screen.height / 2 - h / 2;
  chrome.windows.create({
    url:
      chrome.extension.getURL('insurer-details.html') + '?syncID=' + '3123125',
    type: 'panel',
    height: 650,
    width: 450,
    left: left,
    top: top,
  });
};

const triggerResyncOn = () => {
  chrome.notifications.clear('OFF', () => {
    chrome.runtime.sendMessage('', {
      type: 'notification',
      notificationId: 'ON',
      options: notifOptions({
        title: 'Insurance checker is running.',
        message: 'checking all providers for clients.',
      }),
    });
  });
};
