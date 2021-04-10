chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('>>>>>>>>> showPageAction', request);
  if (request.sendScope === 'getScope') {
    $('.ioff-stuck').css('color', 'green');
    const scopedData = $('#app').scope().$parent.$parent.vm.currentUserService;
    console.log('>>>>>>>>> scopedData', scopedData);
  }
});
