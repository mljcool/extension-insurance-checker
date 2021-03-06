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
const getScopeFromPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log('getScopeFromPage', tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, {
      sendScope: 'getScope',
      tabURL: tabs[0].url,
    });
  });
};

const getRandomToken = () => {
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  return hex;
};

const setChromeIdentity = () => {
  const chromeId = getRandomToken();
  chrome.storage.local.get('chromeId', (items) => {
    if (!items.chromeId) {
      chrome.storage.local.set({ chromeId: chromeId }, function() {
        console.log('Value is set to ' + chromeId);
      });
    }
  });
};

const getChromeIdentity = () => {
  chrome.storage.sync.get('userid', function(items) {
    console.log('getChromeIdentity', items);
  });
};

const getExtensionStatus = () => {
  chrome.storage.sync.get('SWITCH', ({ SWITCH }) => {
    const isChecked = SWITCH === 'ON';
  });
};

const setExtensionStatus = (status) => {
  chrome.storage.sync.set({ SWITCH: status }, (items) => {});
};

const getClientsIdentity = () => {
  chrome.storage.local.get('clientsInsaApp', function(items) {
    console.log('clientsclientsclients', items);
  });
};
