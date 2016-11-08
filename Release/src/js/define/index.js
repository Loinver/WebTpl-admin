layui.use(['jquery', 'element'], function() {
  var $ = layui.jquery,
    element = layui.element();
  //侧边导航
  $('.layui-side .layui-nav-title').click(function() {
    var stop_item = $(this).attr('nav-item-num');
    var nav_item_icon = $(this).find('.layui-icon');
    if($(this).hasClass('item-hide')) {
      $(this).nextAll('.layui-nav-item').slice(0, stop_item).slideToggle(100);
      $(this).addClass('item-show').removeClass('item-hide');
      nav_item_icon.css('transform', 'rotate(0deg)');
    } else if($(this).hasClass('item-show')) {
      $(this).nextAll('.layui-nav-item').slice(0, stop_item).slideToggle(100);
      $(this).addClass('item-hide').removeClass('item-show');
      nav_item_icon.css('transform', 'rotate(-180deg)');
    }
  });
});