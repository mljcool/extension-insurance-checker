$(function() {
  $('#codepen').change(function() {
    const isChecked = $(this).is(':checked');
    console.log('isChecked', isChecked);
    if ($(this).is(':checked')) {
      chrome.notifications.clear('OFF', () => {
        chrome.runtime.sendMessage('', {
          type: 'notification',
          notificationId: 'ON',
          options: notifOptions({
            title: 'Insurance checker is running.',
            message: 'checking all providers for clients.',
          }),
        });
        getScopeFromPage();
        removedFiltersLogo('none');
        changeCssLogoBorder('2px #576475 solid');
        clearStatusNotifications();
        setExtensionStatus('ON');
      });
    } else {
      chrome.notifications.clear('ON', () => {
        chrome.runtime.sendMessage('', {
          type: 'notification',
          notificationId: 'OFF',
          options: notifOptions({
            title: 'Insurance checker OFF',
            message: 'stopping all services..',
          }),
        });
        removedFiltersLogo('invert(0.5)');
        changeCssLogoBorder('2px #cfcfcf solid');
        clearStatusNotifications();
        setExtensionStatus('OFF');
      });
    }
  });
  getChromeIdentity();
  getExtensionStatus();
  getClientsIdentity();
});
