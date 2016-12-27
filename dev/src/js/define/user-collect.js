layui.use(['layer'], function() {
  var $ = layui.jquery,
    layer = layui.layer;
  //数据
  var dataProvince = [{
    name: '北京',
    value: 21300
  }, {
    name: '天津',
    value: 5816
  }, {
    name: '上海',
    value: 28408
  }, {
    name: '重庆',
    value: 7890
  }, {
    name: '河北',
    value: 7120
  }, {
    name: '河南',
    value: 12406
  }, {
    name: '云南',
    value: 6870
  }, {
    name: '辽宁',
    value: 9845
  }, {
    name: '黑龙江',
    value: 5222
  }, {
    name: '湖南',
    value: 12658
  }, {
    name: '安徽',
    value: 10783
  }, {
    name: '山东',
    value: 16253
  }, {
    name: '新疆',
    value: 3536
  }, {
    name: '江苏',
    value: 31939
  }, {
    name: '浙江',
    value: 33156
  }, {
    name: '江西',
    value: 8684
  }, {
    name: '湖北',
    value: 14803
  }, {
    name: '广西',
    value: 7531
  }, {
    name: '甘肃',
    value: 2880
  }, {
    name: '山西',
    value: 5444
  }, {
    name: '内蒙古',
    value: 37750
  }, {
    name: '陕西',
    value: 7435
  }, {
    name: '吉林',
    value: 40190
  }, {
    name: '福建',
    value: 14269
  }, {
    name: '贵州',
    value: 5106
  }, {
    name: '广东',
    value: 11800
  }, {
    name: '青海',
    value: 60000
  }, {
    name: '西藏',
    value: 36500
  }, {
    name: '四川',
    value: 48894
  }, {
    name: '宁夏',
    value: 10270
  }, {
    name: '海南',
    value: 2149
  }, {
    name: '台湾',
    value: 58888
  }, {
    name: '香港',
    value: 36666
  }, {
    name: '澳门',
    value: 7000
  }];
  var provinceNum = []; //新建人数的空数组
  dataProvince.forEach(function(val, key) {
    provinceNum.push(val.value);
  })
  provinceMaxNum = provinceNum.max(); //得到数组最大值
  console.log("人数最多的省份" + provinceMaxNum); //人数最多的省份
  //让数目为整万数
  provinceMaxNum = Math.ceil(provinceMaxNum / 10000) * 10000;
  console.log("人数最多的省份最接近的整万数" + provinceMaxNum);
  /**
   * 地图
   */
  var echartMap = echarts.init(document.getElementById('user-form-map'));
  echartMap.setOption({
    title: {
      text: '本站用户来源省份',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
    },
    //legend: {
    //  orient: 'vertical',
    //  left: 'left',
    //  data: ['2016年']
    //},
    visualMap: {
      min: 0,
      max: provinceMaxNum, //以人数最多的省份作为上限
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      right: '5%',
      top: 'center',
      feature: {
        dataView: {
          readOnly: false
        },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      name: '本站用户来源的省份',
      type: 'map',
      mapType: 'china',
      roam: false,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: dataProvince
    }, ]
  });
  /**
   * 饼状图
   */
  //新建数组
  var dataTopProvince = dataProvince.sort(sortBy('value')).reverse().splice(0, 10); //人数前十的省份数据
  console.log(dataTopProvince);
  var provinceName = []; //新建省份的空数组
  dataTopProvince.forEach(function(val, key) {
    provinceName.push(val.name);
  })
  var echartPie = echarts.init(document.getElementById("user-form-pie"));
  echartPie.setOption({
    title: {
      text: '站点用户来源最多的十大省份',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: '10%',
      data: provinceName
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: dataTopProvince,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });
})