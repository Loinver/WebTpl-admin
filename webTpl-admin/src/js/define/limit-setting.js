layui.use('form', function() {
  var $ = layui.jquery,
    layer = layui.form();
  //获取数据
  function loadDate() {
    $.ajax({
      type: "get",
      url: "../../../json/limit.json",
      async: true,
      success: function(datas, index) {
        var limits = new Vue({
          el: '#limit-box',
          data: {
            limitsAll: datas.data
          }
        })
      }
    });
  }
  //渲染数据
  loadDate();
  $(function() {
    //全选
    $('.fly-limit').on('click', '.fly-limit-box-left .fly-limit-list', function() {
      debugger;
      console.log(111);

    });
    //权限
    var lList = $("#lList");
    var llList = document.getElementById("lList");
    var rList = $("#rList");
    var items = $(".data-list li");
    for(var i = 0; i < items.length; i++) {
      items[i].onclick = itemsclick;
      items[i].ondblclick = itemsdblclick;
    }

    function itemsdblclick() {
      if(this.parentNode === llList) {
        rList.append(this);
      } else {
        lList.append(this);
      }
    }

    function itemsclick() {
      var classname = this.className;
      if(classname === "selected") {
        this.className = "";
      } else {
        this.className = "selected";
      }
    }

    function itemsMove() {
      var items = $(".data-list li.selected");
      for(var i = 0; i < items.length; i++) {
        if(this.id === "add") {
          rList.append(items[i]);
        } else {
          lList.append(items[i]);
        }
      }
    }
    $("#add").on("click", itemsMove);
    $("#remove").on("click", itemsMove);
  })
})