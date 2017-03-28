$(function () {
  $('#navigation').sidr({
    name: 'sidr-right',
    side: 'right',
  });
  $(document).on('click', ':not(#sidr-right)', function () {
    console.log('clicked');
    $.sidr('close', 'sidr-right');
  });
});
