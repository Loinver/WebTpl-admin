//初始化
layui.use(['layer', 'datatable'], function() {
  var $ = layui.jquery,
    layer = layui.layer;
  $(function() {
    $('#userTable').dataTable({
      "language": lang, //提示信息
      "autoWidth": false, //自适应宽度，
      "lengthMenu": [15, 30, 50],
      "stripeClasses": ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
      "searching": true, //是否允许Datatables开启本地搜索
      "paging": true, //是否开启本地分页
      "lengthChange": true, //是否允许产品改变表格每页显示的记录数
      "info": true, //控制是否显示表格左下角的信息
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
        "orderable": false,
        "aTargets": [0, 10] // 指定列不参与排序
      }],
      "deferRender": true, //延迟渲染
      "ajax": "../../../json/user.json", //数据的路径
      "columns": [{ //定义列
        "data": function(obj) {
          return '<input type="checkbox" class="fly-checkbox" name="sublist" data-id=' + obj.id + '>';
        }
      }, {
        "data": "id"
      }, {
        "data": function(obj) {
          return '<u class="btn-showuser">' + obj.userName + '</u>';
        }
      }, {
        "data": "userSex"
      }, {
        "data": "phone"
      }, {
        "data": "identity"
      }, {
        "data": "email"
      }, {
        "data": "address"
      }, {
        "data": function(obj) {
          return replaceTime(obj.joinTime / 1000);
        }
      }, {
        "data": function(obj) {
          if(obj.status) {
            return '<span class="label label-success radius">已启用</span>';
          } else {
            return '<span class="label label-default radius">已停用</span>';
          }
        },
        "className": "td-status"
      }, {
        "data": function(obj) {
          if(obj.status) {
            return '<span title="停用" class="handle-btn handle-btn-stop"><i class="linyer icon-zanting"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="修改密码" class="handle-btn handle-btn-updatepwd"><i class="linyer icon-xgpwd2"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          } else {
            return '<span title="启用" class="handle-btn handle-btn-run"><i class="linyer icon-qiyong"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="修改密码" class="handle-btn handle-btn-updatepwd"><i class="linyer icon-xgpwd2"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          }
        },
        "className": "td-handle"
      }]
    });
  });
  //用户--查看
  $("#userTable").on('click', '.btn-showuser', function() {
    var username = $(this).html();
    var href = 'user-show.html';
    layer_show(username, href, '', '400', '500');
  });
  /*用户-添加*/
  $("#btn-adduser").on('click', function() {
    var username = $(this).html();
    var href = 'user-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*刷新当前页面*/
  $("#refresh").on('click', function() {
    window.location.reload();
  });
  /*用户-停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    layer.confirm('确认要停用吗？', {
      icon: 0,
      title: '警告',
      shade: false
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
    layer.confirm('确认要启用吗？', {
      icon: 0,
      title: '警告',
      shade: false
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
    layer_show('编辑', 'user-edit.html', '', '800', '600');
  });
  /*密码-修改*/
  $('.table-sort').on('click', '.handle-btn-updatepwd', function() {
    var obj = $(this);
    layer_show('编辑', 'user-updatepwd.html', '', '600', '500');
  });
  /*用户-删除*/
  $('.table-sort').on('click', '.handle-btn-delect', function() {
    var obj = $(this);
    layer.confirm('确认要删除吗？', {
      icon: 0,
      title: '警告',
      shade: false
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
        title: '警告',
        shade: false
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