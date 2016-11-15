layui.config({
  base: '../../src/js/lib/' //自定义layui组件的目录
}).extend({ //设定组件别名
  datatable: 'datatable',
});
//初始化
layui.use(['form', 'layer', 'jquery', 'datatable'], function() {
  var $ = layui.jquery,
    form = layui.form(),
    layer = layui.layer,
    laypage = layui.laypage,
    datatable = layui.datatable;
  $(function() {
    $('.table-sort').dataTable({
      "searching": false, //是否允许Datatables开启本地搜索
      "paging": false, //是否开启本地分页
      "lengthChange": false, //是否允许用户改变表格每页显示的记录数
      "info": false, //控制是否显示表格左下角的信息
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
          "sProcessing": "正在加载中......",
          "sEmptyTable": "无数据",
          "orderable": false,
          "aTargets": [0, 9]
        } // 指定列不参与排序
      ],
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
  //用户--查看
  $('.btn-showuser').on('click', function() {
    var username = $(this).html();
    var href = 'user-show.html';
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer_show(username, href, id, '400', '500');
  });
  /*用户-添加*/
  $('#btn-adduser').on('click', function() {
    var username = $(this).html();
    var href = 'user-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*用户-停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要停用吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-run" title="启用"><i class="linyer icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">已停用</span>');
      $(obj).remove();
      layer.msg('已停用!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*用户--启用*/
  $('.table-sort').on('click', '.handle-btn-run', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要启用吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-stop" title="停用"><i class="linyer icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
      $(obj).remove();
      layer.msg('已启用!', {
        icon: 6,
        time: 1000
      });
    });
  });
  /*用户-编辑*/
  $('.table-sort').on('click', '.handle-btn-edit', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer_show('编辑', 'user-edit.html', id, '800', '600');
  });
  /*密码-修改*/
  $('.table-sort').on('click', '.handle-btn-updatepwd', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer_show('编辑', 'user-updatepwd.html', id, '600', '500');
  });
  /*用户-删除*/
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
  //批量删除
  $('#btn-delect-all').on('click', function() {
    //这是相对应的那一行数据移出
    console.log($(".table-sort tbody :checkbox:checked").length);
    if($(".table-sort tbody :checkbox:checked").length == 0) {
      layer.msg('请选择需要删除的数据！', {
        icon: 0
      });
    } else {
      layer.confirm('确认要删除吗？', {
        icon: 0,
        title: '警告'
      }, function(index) {
        $(".table-sort tbody :checkbox:checked").parents('tr').remove(); //删除方法
        layer.msg('已删除!', {
          icon: 1,
          time: 1000
        });
      });
    }
  });
});