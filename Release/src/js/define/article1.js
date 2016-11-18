layui.config({
  base: '../../src/js/lib/'
}).extend({
  datatable: 'datatable'
});
layui.use(['layer', 'jquery', 'laypage', 'datatable', 'laytpl'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    laypage = layui.laypage,
    laytpl = layui.laytpl;
  $(function() {
    /**
     * 渲染数据
     */
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
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页",
        "sJump": "跳转"
      },
      "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
      }
    };
    var checkbox = '<input type="checkbox" name="">';
    $('#article').dataTable({
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
          "aTargets": [0, 4, 7]
        } // 指定列不参与排序
      ],
      "deferRender": true,
      "ajax": "../../../json/article.json",
      "columns": [{
        "data": function(obj) {
          return '<input type="checkbox" name="article-list" data-id=' + obj.id + '>';
        }
      }, {
        "data": "id"
      }, {
        "data": "articleSorts"
      }, {
        "data": "articleTitle"
      }, {
        "data": "articleContents",
        "className": "oneline"
      }, {
        "data": function(obj) {
          return replaceTime(obj.releaseTime / 1000);
        }
      }, {
        "data": function(obj) {
          if(obj.releaseStatus) {
            return '<span class="label label-success radius">正常发布</span>';
          } else {
            return '<span class="label label-default radius">暂停发布</span>';
          }
        },
        "className": "td-status"
      }, {
        "data": function(obj) {
          if(obj.releaseStatus) {
            return '<span title="暂停发布" class="handle-btn handle-btn-stop"><i class="linyer icon-zanting"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          } else {
            return '<span title="正常发布" class="handle-btn handle-btn-run"><i class="linyer icon-qiyong"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          }
        },
        "className": "td-handle"
      }]
    });
  });
  //文章--查看
  $('.btn-showuser').on('click', function() {
    var username = $(this).html();
    var href = 'article-show.html';
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer_show(username, href, id, '360', '400');
  });
  /*文章-添加*/
  $('#btn-adduser').on('click', function() {
    var username = $(this).html();
    var href = 'article-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*文章--停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要暂停发布吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-run" title="开始发布"><i class="linyer icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">暂停发布</span>');
      $(obj).remove();
      layer.msg('已暂停发布!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*文章--启用*/
  $('.table-sort').on('click', '.handle-btn-run', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要开始发布吗？', {
      icon: 0,
      title: '警告'
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-stop" title="暂停发布"><i class="linyer icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">正常发布</span>');
      $(obj).remove();
      layer.msg('已开始发布!', {
        icon: 6,
        time: 1000
      });
    });
  });
  /*文章-编辑*/
  $('.table-sort').on('click', '.handle-btn-edit', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer_show('编辑', 'article-edit.html', id, '600', '500');
  });
  /*文章-删除*/
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
});