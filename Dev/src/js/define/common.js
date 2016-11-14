layui.config({
  base: '../../src/js/lib/' //假设这是test.js所在的目录
}).extend({ //设定组件别名

});
layui.use(['jquery', 'element', 'layer'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    element = layui.element();
  /*全选*/
  $("table thead th input:checkbox").on("click", function() {
    $(this).closest("table").find("tr > td:first-child input:checkbox").prop("checked", $("table thead th input:checkbox").prop("checked"));
  });
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
//注册弹出方法
function layer_show(title, url, id, w, h) {
  if(title == null || title == '') {
    title = false;
  };
  if(url == null || url == '') {
    url = "404.html";
  };
  if(w == null || w == '') {
    w = 800;
  };
  if(h == null || h == '') {
    h = ($(window).height() - 50);
  };
  layer.open({
    type: 2,
    area: [w + 'px', h + 'px'],
    fix: false,
    maxmin: false,
    shade: 0.4,
    title: title,
    content: url
  });
};
/*关闭弹出框口*/
function layer_close() {
  var index = parent.layer.getFrameIndex(window.name);
  parent.layer.close(index);
}