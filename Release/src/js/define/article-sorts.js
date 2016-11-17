layui.use('tree', function() {
  var sortNodes = [{ //节点
    name: '媒体报道',
    id: 1,
    spread: true,
    touch: false,
    children: [{
      name: '文章名1',
      id: 11,
      touch: true,
    }, {
      name: '文章名2',
      id: 12,
      touch: true,
    }]
  }, {
    name: '推荐阅读',
    id: 2,
    touch: false,
    children: [{
      name: '子节点21',
      id: 21,
      touch: true,
    }, {
      name: '子节点22',
      id: 22,
      touch: true,
    }]
  }];
  layui.tree({
    elem: '#sorts',
    nodes: sortNodes,
    click: function(node) {
      console.log(node); //node即为当前点击的节点数据
      if(node.touch == false) {
        layer.prompt({
          title: '修改栏目名称',
          formType: 3
        }, function(text, index) {
          console.log("修改后的栏目名称为" + text);
          if(1 == 1) { //成功
            layer.close(index);
            layerMsg('修改成功', 6);
          } else {
            layer.close(index);
            layerMsg('修改失败', 5);
          }
        });
      } else {
        layer_show(node.name, 'article-edit.html', node.id, '800', '600');
      }
    }
  });
})