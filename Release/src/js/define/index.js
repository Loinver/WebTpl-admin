layui.use(['element', 'layer'], function() {
  var $ = layui.jquery,
    element = layui.element(),
    layer = layui.layer;
  //iframe自适应
  $(window).on('resize', function() {
    var $content = $('#tabContainers');
    $content.height($(this).height() - 145);
    $content.find('iframe').each(function() {
      $(this).height($content.height());
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
          element.tabChange('page-tab', $li.length - 1);
        } else {
          //切换tab
          element.tabChange('page-tab', tabIndex);
        }
      });
    }
  })
  //给第一个tab页设置禁止关闭
  $('#tabTitle').children('li:first-child').find('i').remove();
})