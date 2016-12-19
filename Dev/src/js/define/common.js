layui.config({
  base: '../../src/js/lib/' //假设这是test.js所在的目录
}).extend({ //设定组件别名
  datatable: 'datatable'
});
layui.use(['element', 'layer'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    element = layui.element();
  /*全选*/
  $(function() {
    $('.table-sort').on('click', '.btn-checkall', function() {
      $('.btn-checkall').prop('checked', this.checked);
      $('[type="checkbox"][name="sublist"]').prop("checked", this.checked);
    });
    $('.table-sort').on('click', '[type="checkbox"][name="sublist"]', function() {
      $('.btn-checkall').prop("checked", $('[type="checkbox"][name="sublist"]').length == $('[type="checkbox"][name="sublist"]:checked').length ? true : false);
    });
  })
});
/**
 * @param {String} 提示的内容
 * @param {Number} 图标
 * @description 0为警告，1为成功，2为错误，3为问号，4为锁定，5为失败， 6为成功
 */
function layerMsg(text, icon) {
  layer.msg(text, {
    icon: icon,
    time: 1000
  });
}
//table配置项汉化
var lang = {
  "sProcessing": "处理中...",
  "sLengthMenu": "每页 _MENU_ 项",
  "sZeroRecords": "没有匹配结果",
  "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
  "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
  "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
  "sInfoPostFix": "",
  "sSearch": "本地搜索：",
  "sUrl": "",
  "sEmptyTable": "暂无数据",
  "sLoadingRecords": "载入中...",
  "sInfoThousands": ",",
  "oPaginate": {
    "sFirst": "首页",
    "sPrevious": "上一页",
    "sNext": "下一页",
    "sLast": "最后页",
    "sJump": "跳转至"
  },
  "oAria": {
    "sSortAscending": ": 以升序排列此列",
    "sSortDescending": ": 以降序排列此列"
  }
};
//注册弹出方法
function layer_show(title, url, id, w, h) {
  if(title == null || title == '') {
    title = false;
  };
  if(w == null || w == '') {
    w = 800;
  };
  if(h == null || h == '') {
    h = ($(window).height() - 300);
  };
  layer.open({
    type: 2,
    area: [w + 'px', h + 'px'],
    fix: false,
    maxmin: true,
    shade: false,
    title: title,
    content: url
  });
};
/*关闭弹出框口*/
function layer_close() {
  var index = parent.layer.getFrameIndex(window.name);
  parent.layer.close(index);
}
/**
 * 格式化时间戳
 */
function replaceTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}