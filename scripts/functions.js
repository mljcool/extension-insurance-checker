const notifOptions = function({ title, message }) {
  return {
    type: 'basic',
    iconUrl: './icons/icon48.png',
    silent: false,
    priority: 2,
    title,
    message,
  };
};

const clearStatusNotifications = () => {
  let mySetTimeout = null;
  mySetTimeout = setTimeout(() => {
    chrome.notifications.clear('OFF', (status) => {});
    chrome.notifications.clear('ON', (status) => {});
    clearTimeout(mySetTimeout);
  }, 3000);
};

const removedFiltersLogo = (cssProp) => {
  $('.mycrm-logo').css('filter', cssProp);
};

const getScopeFromPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { sendScope: 'getScope' });
  });
};
