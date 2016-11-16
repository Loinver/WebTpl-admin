layui.use('tree', function() {
  var sortNodes = [{ //节点
    name: '媒体报道',
    id: 1,
    children: [{
      name: '文章名1',
      id: 11,
    }, {
      name: '文章名2',
      id: 12,
    }]
  }, {
    name: '推荐阅读',
    id: 2,
    children: [{
      name: '子节点21',
      id: 21,
      children: [{
        name: '子节点211',
        id: 211,
      }],
      name: '子节点22',
      id: 22,
    }]
  }];
  layui.tree({
    elem: '#sorts',
    nodes: sortNodes,
    click: function(node) {
      console.log(node); //node即为当前点击的节点数据
      layer_show(node.name, 'article-edit.html', node.id, '800', '600');
    }
  });
})