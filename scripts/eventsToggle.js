$(function() {
  $('.user-settings').click(function() {
    $('.sync-provider-menu').removeClass('noshow');
    $('.set-menus')
      .children()
      .not('.sync-provider-menu')
      .addClass('noshow');
  });
});
