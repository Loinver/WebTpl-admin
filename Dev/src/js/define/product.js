layui.use(['layer', 'datatable'], function() {
  var $ = layui.jquery,
    layer = layui.layer;
  $(function() {
    $('#productTable').dataTable({
      "language": lang, //提示信息
      "autoWidth": false, //自适应宽度，
      "lengthMenu": [10, 20, 30],
      "stripeClasses": ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
      "searching": true, //是否允许Datatables开启本地搜索
      "paging": true, //是否开启本地分页
      "lengthChange": true, //是否允许产品改变表格每页显示的记录数
      "info": true, //控制是否显示表格左下角的信息
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
        "orderable": false,
        "aTargets": [0, 4, 8] // 指定列不参与排序
      }],
      "deferRender": true, //延迟渲染
      "ajax": "../../../json/product.json", //数据的路径
      "columns": [{ //定义列
        "data": function(obj) {
          return '<input type="checkbox" name="article-list" data-id=' + obj.id + '>';
        }
      }, {
        "data": "id"
      }, {
        "data": "sorts"
      }, {
        "data": function(obj) {
          return '<u class="btn-showarticle">' + obj.title + '</u>';
        }
      }, {
        "data": function(obj) {
          if(obj.thumbImg == "") {
            return '<img src="../../src/imgs/common/no-pic.png" layer-src="../../src/imgs/common/no-pic.png" class="pdut-thumbnail" alt="默认缩略图">';
          } else {
            return '<img src="' + obj.thumbImg + '" layer-src="' + obj.thumbImg + '" class="pdut-thumbnail" alt="缩略图">';
          }
        }
      }, {
        "data": "describe",
        "className": "oneline"
      }, {
        "data": function(obj) {
          return obj.unitPrice + "元";
        }
      }, {
        "data": function(obj) {
          if(obj.status) {
            return '<span class="label label-success radius">正常销售</span>';
          } else {
            return '<span class="label label-default radius">暂停销售</span>';
          }
        },
        "className": "td-status"
      }, {
        "data": function(obj) {
          if(obj.status) {
            return '<span title="暂停销售" class="handle-btn handle-btn-stop"><i class="linyer icon-zanting"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          } else {
            return '<span title="正常销售" class="handle-btn handle-btn-run"><i class="linyer icon-qiyong"></i></span><span title="编辑" class="handle-btn handle-btn-edit"><i class="linyer icon-edit"></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
          }
        },
        "className": "td-handle"
      }]
    });
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