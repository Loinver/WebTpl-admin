layui.use(['jquery', 'layer'], function() {
  var $ = layui.jquery,
    layer = layui.Layer;
  /*全选*/
  $("table thead th input:checkbox").on("click", function() {
    $(this).closest("table").find("tr > td:first-child input:checkbox").prop("checked", $("table thead th input:checkbox").prop("checked"));
  });
});
//弹出层方法
function layer_show(title, url, w, h) {
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
    fix: false, //不固定
    maxmin: true,
    shade: 0.4,
    title: title,
    content: url
  });
}
/*关闭弹出框口*/
function layer_close() {
  var index = parent.layer.getFrameIndex(window.name);
  parent.layer.close(index);
}
/*用户-添加*/
function member_add(title, url, w, h) {
  layer_show(title, url, w, h);
}
/*用户-查看*/
function member_show(title, url, id, w, h) {
  layer_show(title, url, w, h);
}
/*用户-停用*/
function member_stop(obj, id) {
  layer.confirm('确认要停用吗？', function(index) {
    $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn" onClick="member_start(this,id)" title="启用"><i class="mobilefont icon-qiyong"></i></span>');
    $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
    $(obj).remove();
    layer.msg('已停用!', {
      icon: 5,
      time: 1000
    });
  });
}
/*用户-启用*/
function member_start(obj, id) {
  layer.confirm('确认要启用吗？', function(index) {
    $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn" onClick="member_stop(this,id)" title="停用"><i class="mobilefont icon-zanting"></i></span>');
    $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
    $(obj).remove();
    layer.msg('已启用!', {
      icon: 6,
      time: 1000
    });
  });
}
/*用户-编辑*/
function member_edit(title, url, id, w, h) {
  layer_show(title, url, w, h);
}
/*密码-修改*/
function change_password(title, url, id, w, h) {
  layer_show(title, url, w, h);
}
/*用户-删除*/
function member_del(obj, id) {
  layer.confirm('确认要删除吗？', function(index) {
    $(obj).parents("tr").remove();
    layer.msg('已删除!', {
      icon: 1,
      time: 1000
    });
  });
}