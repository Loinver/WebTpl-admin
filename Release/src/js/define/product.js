layui.config({
  base: '../../src/js/lib/'
}).extend({
  datatable: 'datatable'
});
layui.use(['layer', 'jquery', 'laypage', 'datatable'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    laypage = layui.laypage,
    datatable = layui.datatable;
  $(function() {
    $('.table-sort').dataTable({
      "searching": false, //是否允许Datatables开启本地搜索
      "paging": false, //是否开启本地分页
      "lengthChange": false, //是否允许产品改变表格每页显示的记录数
      "info": false, //控制是否显示表格左下角的信息
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
          "sProcessing": "正在加载中......",
          "sEmptyTable": "无数据",
          "orderable": false,
          "aTargets": [0, 4, 5]
        } // 指定列不参与排序
      ]
    });
    $('.table-sort tbody').on('click', 'tr', function() {
      if($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        $('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });
  });
  //数据分页
  laypage({
    cont: 'product-page', //id
    pages: 100, //总页数
    groups: 5 //连续显示分页数
  });
  //产品--查看
  $('.btn-showuser').on('click', function() {
    var username = $(this).html();
    var href = 'product-show.html';
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer_show(username, href, id, '800', '600');
  });
  /*产品-添加*/
  $('#btn-adduser').on('click', function() {
    var username = $(this).html();
    var href = 'product-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*产品--停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要暂停销售吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-run" title="开始销售"><i class="linyer icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">暂停销售</span>');
      $(obj).remove();
      layer.msg('已暂停销售!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*产品--启用*/
  $('.table-sort').on('click', '.handle-btn-run', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要开始销售吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-stop" title="暂停销售"><i class="linyer icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">正常销售</span>');
      $(obj).remove();
      layer.msg('已开始销售!', {
        icon: 6,
        time: 1000
      });
    });
  });
  /*产品-编辑*/
  $('.table-sort').on('click', '.handle-btn-edit', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer_show('编辑', 'product-edit.html', id, '600', '500');
  });
  /*产品-删除*/
  $('.table-sort').on('click', '.handle-btn-delect', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要删除吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").remove(); //删除方法
      layer.msg('已删除!', {
        icon: 1,
        time: 1000
      });
    });
  });
  /*产品缩略图查看大图*/
  layer.photos({
    photos: '.table-sort tbody',
    anim: 5
  });
});