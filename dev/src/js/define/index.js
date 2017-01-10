layui.use(['element', 'layer'], function() {
  var $ = layui.jquery,
    element = layui.element(),
    layer = layui.layer;
  //iframe自适应
  $(window).on('resize', function() {
    var $obj = $('#tabContainers');
    $obj.height($(this).height() - 145);
    $obj.find('iframe').each(function() {
      $(this).height($obj.height());
    });
  }).resize();
  //添加tab
  var $tabs = $('#tabTitle'); //tab标题
  var $tabContainers = $('#tabContainer'); //tab 内容块
  //给nav绑定事件
  $('.layui-nav .layui-nav-item > a').each(function() {
    var $obj = $(this);
    var url = $obj.data('url'); //tab内容的地址
    //获取设定的url
    if(url !== undefined) {
      $obj.on('click', function() {
        var tabTitle = $obj.html();
        var count = 0;
        var tabIndex;
        $tabs.find('li').each(function(i, e) {
          if($(this).find('label').text() === $obj.text()) {
            count++;
            tabIndex = i;
          };
        });
        if(count === 0) {
          //添加删除样式
          tabTitle += '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>';
          //添加tab
          element.tabAdd('page-tab', {
            title: tabTitle,
            content: '<iframe src="' + url + '"></iframe>'
          });
          //iframe 自适应
          var $content = $('.layui-tab-content');
          $content.find('iframe').each(function() {
            $(this).height($content.height());
          });
          //给tab-nav绑定关闭事件
          $tabs = $('#tabTitle');
          var $li = $tabs.find('li');
          $li.eq($li.length - 1).children('i.layui-tab-close').on('click', function() {
            element.tabDelete('page-tab', $(this).parent('li').index());
          });
          //获取焦点
          element.tabChange('page-tab', --$li.length);
        } else {
          //切换tab
          element.tabChange('page-tab', tabIndex);
        }
      });
    }
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
})

