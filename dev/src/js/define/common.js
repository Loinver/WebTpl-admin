layui.config({
  base: '../../src/js/lib/' //扩展组件目录
}).extend({ //设定组件别名
  datatable: 'datatable', //公用组件命名部分
  datatableButton: 'dataTables/extensions/Buttons/js/dataTables.buttons',
  datatableFlash: 'dataTables/extensions/Buttons/js/buttons.flash',
  datatableHtml5: 'dataTables/extensions/Buttons/js/buttons.html5',
  datatablePrint: 'dataTables/extensions/Buttons/js/buttons.print',
  datatableColVis: 'dataTables/extensions/Buttons/js/buttons.colVis',
  datatableSelect: 'dataTables/extensions/Select/js/dataTables.select',
  datatableEditer: 'dataTables/extensions/Editor/js/dataTables.editor.min', //编辑
});
layui.use(['layer', 'util', 'element'], function() {
  var $ = layui.jquery,
    layer = layui.layer,
    element = layui.element(),
    util = layui.util;
  /**
   * 使用内部工具组件
   */
  util.fixbar();
  /**
   ****************************jq扩展函数*******************************v**
   */
  /**
   * 全选
   */
  $(function() {
    $('.table-sort').on('click', '.btn-checkall', function() {
      $('.btn-checkall').prop('checked', this.checked);
      $('[type="checkbox"][name="sublist"]').prop("checked", this.checked);
    });
    $('.table-sort').on('click', '[type="checkbox"][name="sublist"]', function() {
      $('.btn-checkall').prop("checked", $('[type="checkbox"][name="sublist"]').length == $('[type="checkbox"][name="sublist"]:checked').length ? true : false);
    });
    /**
     * 提示
     */
    $('.tips-icon,.tips-obj').hover(function() {
      $(this).find('.dialog-warp').show();
      $(this).find('.dialog-warp').stop();
      $(this).find('.dialog-warp').animate({
        "opacity": 1
      }, 300);
    }, function() {
      $(this).find('.dialog-warp').stop();
      $(this).find('.dialog-warp').animate({
        "opacity": 0
      }, 300);
      $(this).find('.dialog-warp').hide();
    })
    $('.dialog-warp').each(function() {
      var H = $(this).height();
      $(this).css('margin-top', -H / 2);
    });
    /**
     * 速度动画
     * @param {Object} obj
     */
    var $obj = $('.fly-numberAdd');
    $obj.each(function() {
      var $this = $(this);
      var max_number = $this.data("value"); //最大值
      var plus_number = Math.ceil(max_number / 99); //增加值,因为时间变化一样的
      var start_number = 0;
      var Interval = setInterval(function() {
        start_number += plus_number;
        if(start_number > max_number) {
          $this.html(max_number);
          clearInterval(Interval);
        } else {
          $this.text(start_number);
        }
      }, 10);
    });
    /**
     * 数字过万则处理
     */
    $('.fly-number').each(function(i, obj) {
      var n = +$(obj).data('number');
      if(n > 10000) {
        $(obj).text((n / 10000).toFixed(2) + '万');
      }
    });
    /**
     * 刷新当前页
     */
    $("#refresh").on('click', function() {
      window.location.reload();
    });
  });
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
  "sProcessing": "<div class='loader'>加载中...</div>",
  "sLengthMenu": "每页 _MENU_ 项",
  "sZeroRecords": "换个搜索词试试呢？暂无数据",
  "sInfo": "当前显示第 _START_ 至 _END_ 项，全部 _TOTAL_ 项。",
  "sInfoEmpty": "当前显示第 0 至 0 项，全部 0 项",
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
/**
 * 关闭弹出框口
 */
function layer_close() {
  var index = parent.layer.getFrameIndex(window.name);
  parent.layer.close(index);
}
/**
 *********************************扩展原生函数**********************************
 */
/**
 * addclass函数封装
 * @param {Object} obj
 * @param {Object} classStr
 */
function addClass(obj, classStr) {
  var array = noRepeat(trim(obj.className).split('\s+'));
  if(!inArray(array, classStr)) {
    array.push(classStr);
  }
  obj.className = array.join(' ');
  return obj;
}
/**
 * removeclass函数封装
 * @param {Object} obj
 * @param {Object} classStr
 */
function removeClass(obj, classStr) {
  var array = noRepeat(trim(obj.className).split('\s+'));
  var index = indexOf(array, classStr);
  if(index != -1) {
    classStr.splice(index, 1);
    obj.className = classStr.join(' ');
  }
  return obj;
}
/**
 * toggleClass函数封装
 * @param {Object} obj
 * @param {Object} classStr
 */
function toggleClass(obj, classStr) {
  var array = noRepeat(trim(obj.className).split('\s+'));
  if(inArray(array, classStr)) {
    removeClass(obj, classStr);
  } else {
    addClass(obj, classStr);
  }
}

/**
 * 格式化时间戳
 */
function replaceTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
/**
 * 求数组最大值
 */
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
/**
 * 求数组最小值
 */
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
/**
 * 数组排序
 * @param {name} name
 * arr.sort(sortBy('name'))
 */
function sortBy(name) {
  return function(o, p) {
    var a, b;
    if(typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if(a === b) {
        return 0;
      }
      if(typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw("error");
    }
  }
};
/**
 * 时间差
 * @param {Object} olddate
 */
function timeDiff(olddate) {
  var old = new Date(olddate);
  var dateNum = (new Date()) - old;
  var days = dateNum / 1000 / 60 / 60 / 24;
  return Math.floor(days);
}
/**
 * 获取当前时间
 */
function getNowDate() {
  var now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}
/**
 * 获取星期几
 */
function getWeek() {
  return(new Date()).getDay();
}
getWeek();
/**
 * 数组的indexOf方法封装
 * @param {Object} arr
 * @param {Object} value
 * @param {Object} start
 */
function indexOf(arr, value, start) {
  //如果不设置start,则默认start为0
  if(arguments.length == 2) {
    start = 0;
  }
  //如果数组中存在indexOf方法，则用原生的indexOf方法
  if(arr.indexOf) {
    return arr.indexOf(value, start);
  }
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === value) {
      return i;
    }
  }
  return -1;
}
/**
 * 数组去重方法封装
 * @param {Object} arr
 */
function noRepeat(arr) {
  var result = [];
  for(var i = 0; i < arr.length; i++) {
    if(indexOf(result, arr[i]) == -1) {
      result.push(arr[i]);
    }
  }
  return result;
}
/**
 * inArray方法封装
 * @param {Object} arr
 * @param {Object} value
 */
function inArray(arr, value) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === value) {
      return true;
    }
  }
  return false;
}
/**
 * 去除首尾空格函数封装
 * @param {Object} arr
 */
function trim(arr) {
  var result = arr.replace(/^\s+|\s+$/g, '');
  return result;
}