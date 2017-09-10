//import echarts from 'echarts'

// 完成sexNums
export function sexNums(sex, valueIndex) {
  var vIndex = valueIndex || 0;
  var f = sex['女'] || 1 - sex['男'] || 0;
  var male = Math.floor(sex['男'] * 100)
  return '<div class="sex-male">\
    <svg t="1501780065446" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2271" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M268.608 683.264a35.712 35.712 0 0 0 35.904 35.84 35.904 35.904 0 0 0 0-71.68 36.608 36.608 0 0 0-25.408 10.496 36.608 36.608 0 0 0-10.496 25.344m0 0zM568.64 683.264c0 9.472 3.84 18.752 10.368 25.344a36.032 36.032 0 0 0 61.312-25.344c0-9.344-3.84-18.752-10.496-25.344s-16-10.496-25.344-10.496a36.992 36.992 0 0 0-25.472 10.496 36.224 36.224 0 0 0-10.368 25.344m0 0z" fill="" p-id="2272"></path><path d="M889.984 433.92s-10.56-90.752-59.264-143.36c0 0 34.176-18.368-2.624-49.984 0 0-32.832-7.936-39.488-5.312 0 0-17.088-57.92-51.264-72.384 0 0-29.12-7.04-35.584 21.184 0 0-76.992-39.104-132.608-49.024 0 0-142.016-27.392-180.16-93.376 0 0-8.192-16.704-35.136-6.72 0 0-25.664 20.288-17.792 101.952 0 0 2.176 16.768-107.52-53.44 0 0-27.2-7.04-35.136 13.952 0 0-13.952 49.984 3.52 86.784 0 0-63.104 11.392-90.304 38.656 0 0-30.72 39.488 20.992 45.632 0 0-77.12 43.84-90.368 167.488 0 0-1.536 86.848 26.304 182.976a110.272 110.272 0 0 0 88.192 147.776c15.936 48 42.944 92.288 79.936 129.28a326.208 326.208 0 0 0 232.448 96.256c87.808 0 170.24-34.112 232.512-96.256a327.68 327.68 0 0 0 80.96-132.608 110.272 110.272 0 0 0 94.976-91.648c3.84-23.36-0.192-46.72-10.304-66.752 16.96-50.944 32.064-113.728 27.712-171.072M144.64 749.76A94.976 94.976 0 0 1 72.32 646.4c6.976 20.096 15.36 40.512 25.536 60.224 0 0 20.864 20.864 42.304 13.12 0.896 5.376 1.92 10.496 2.944 15.616l1.536 14.4m319.36 227.392a314.24 314.24 0 0 1-305.92-244.864l-2.624-23.808c2.432-2.88 4.864-6.4 7.168-10.496 0 0 2.752-97.472 60.736-155.2 0 0 50.88 14.144 115.84-21.888 0 0-27.2 33.28-51.84 50.88 0 0-14.016 34.176 17.472 37.76 0 0 97.344 18.24 194.752-45.632 0 0-5.312 32.256 41.216 22.848 0 0 37.824-1.024 98.24-47.552 0 0 13.248 21.888 62.656-5.312 0 0-1.28 43.328 38.208 110.528 0 0 17.216 28.032 17.216 76.992 0 0 4.416 3.776 11.2 7.104l-4.096 25.152a314.112 314.112 0 0 1-300.224 223.488m393.344-307.776a95.04 95.04 0 0 1-75.328 77.888c1.28-4.48 2.24-9.28 3.392-14.016 11.904 0.768 24.896-4.864 33.536-26.88 0 0 17.664-32.64 35.52-80 4.032 13.504 5.184 28.16 2.88 43.008m0 0z" fill="" p-id="2273"></path></svg>\
    <div>男</div><div>' + male +
    '%</div></div>\
    <div class="sex-female">\
    <svg t="1501780073660" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2391" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M292.224 651.2a39.872 39.872 0 0 0 39.808 39.808 39.872 39.872 0 0 0 39.744-39.808 40 40 0 0 0-39.744-39.744 39.68 39.68 0 0 0-39.808 39.744m0 0zM624.192 651.2c0 10.432 4.224 20.864 11.712 28.032a39.168 39.168 0 0 0 56.128 0 39.68 39.68 0 1 0-67.84-28.032m0 0z" fill="" p-id="2392"></path><path d="M910.272 531.264c0-5.312-0.128-10.816-0.448-16.384l0.448-8.768a70.784 70.784 0 0 0-3.712-25.984c-17.408-135.936-101.248-285.824-295.808-324.672a87.68 87.68 0 0 0 3.776-25.024c0-52.864-47.36-95.616-105.728-95.616-58.56 0-105.856 42.752-105.856 95.616 0 8.832 1.28 17.28 3.776 25.28-217.344 44.352-298.432 229.824-299.648 376.704a121.536 121.536 0 0 0 27.584 210.816c43.712 277.312 62.144 202.432 62.144 169.536 0-14.976-6.464-57.856-8.384-109.952 16.576 30.464 37.504 58.496 62.656 83.84a361.6 361.6 0 0 0 257.152 106.432 362.048 362.048 0 0 0 257.28-106.432c16.128-16.064 30.528-33.28 43.008-51.776a4579.072 4579.072 0 0 0-3.072 100.608c0 33.28 32-8.704 65.472-149.44 3.584-14.656 6.72-28.352 9.472-41.344a121.472 121.472 0 0 0 80.32-114.368 121.28 121.28 0 0 0-50.432-99.072M74.56 630.016c0-29.76 12.608-57.216 33.28-76.608l0.96 6.528c8.192 64.064 15.68 118.016 22.592 163.264a104.96 104.96 0 0 1-56.832-93.184m735.36 170.752a346.88 346.88 0 0 1-301.504 175.424 347.648 347.648 0 0 1-320.256-213.376c1.536-73.856 16.384-156.096 70.656-202.816 58.368-50.304 86.784-132.992 100.48-196.544 12.608 55.872 41.664 123.2 107.648 138.688 111.872 26.176 161.472 27.456 212.544 28.352 24.384 0.448 127.168-3.968 137.536 99.52-0.064 0-3.968 88.256-7.104 170.752m74.752-76.224c14.08-68.096 19.008-114.432 21.888-158.4a60.16 60.16 0 0 0 2.944-13.824 104.64 104.64 0 0 1-24.832 172.224m0 0z" fill="" p-id="2393"></path></svg>\
    <div>女</div><div>' +
    (100 - male) + '%</div></div>';
}
export function sextab(element, sex_dist) {
  var sexDatas = [{
      name: '男',
      value: sex_dist['男'] * 100
    },
    {
      name: '女',
      value: sex_dist['女'] * 100
    }
  ];
  var sexDis = element;
  var bound = sexDis.getBoundingClientRect()
  sexDis.width = bound.width;
  sexDis.height = bound.height;
  var sexCtx = sexDis.getContext('2d');
  // 画 100个 矩形，分2组的颜色。
  sexCtx.fillStyle = "#01aef0";

  var sexDisUnit = Math.min(sexDis.width / 60, sexDis.height / 14);

  var rectPadding = Math.floor(sexDisUnit);
  var rectSize = Math.round(2 * sexDisUnit);

  var targetCol = Math.floor(Math.floor(sexDatas[0].value) / 5);
  var targetRow = Math.min(Math.ceil(Math.floor(sexDatas[0].value) % 5), 4);

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach(function (item, col) {
    var x = col * rectPadding + rectSize * col;
    [1, 2, 3, 4, 5].forEach(function (rowItem, row) {
      var y = row * 10 + rectSize * row;
      //    console.log(row + 1 > targetRow && col + 1 > targetCol , row + 1 > targetRow, col + 1 > targetCol)
      if (row + 1 > targetRow && col + 1 > targetCol) {
        sexCtx.fillStyle = '#7f7fff';
      }
      createRect(sexCtx, x, y, rectSize);
    });
  });

  function createRect(ctx, x, y, rectSize) {
    ctx.fillRect(x, y, rectSize, rectSize);
  }
}

export function basicbarCharts(myBChart, data) {
  var xData = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      xData.push(key);
    }
  }
  const color = ['#01aef0', '#03ca99', '#7f7fff', '#ffbd2e', '#1385d9'];
  xData.sort((x, y) => parseInt(x, 10) - parseInt(y, 10));
  const seriesData = xData.map((item, i) => {
    return {
      value: data[item],
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: (p) => {
            return (p.value * 100).toFixed(2) + '%'
          }
        }
      }
    };
  });
  var BarBoption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: (params) => {
        const v = params[0].value * 100
        return params[0].name + '<br />' + '<span class="chartCircleSpan" style="background: ' + params[0].color +
          '"></span>' + v.toFixed(2) + '%';
      }
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '3%',
      top: '6%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: xData,
      axisLine: {
        lineStyle: {
          color: '#c3cbd6'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#464c5b'
        }
      }
    }],
    yAxis: [{
      max: 1,
      show: true,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '',
      type: 'bar',
      barWidth: 40,
      data: seriesData
    }]
  };
  myBChart.setOption(BarBoption)
}

function createInterestSeries(datas, color) {
  var result = [];
  datas.forEach(function (item, i) {
    var center = 100 + i * 200
    result = result.concat([{
      name: item.name,
      type: 'pie',
      radius: [77, 83],
      center: [center, '50%'],
      label: {
        normal: {
          show: item.value[1] && item.value[2],
          position: 'center',
          formatter: function (params) {
            if (params.name == "other") {
              return "";
            }
            return item.value[1] && item.value[2] ? params.name : '';
          },
          textStyle: {
            color: '#9ea7b4',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        emphasis: {
          show: item.value[1] && item.value[2],
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      data: [{
        value: 100,
        name: '\n\n\n————\n全局TGI：' + item.value[1] + '\n行业TGI：' + item.value[2],
        itemStyle: {
          normal: {
            color: '#ccc',
          }
        }
      }, ]
    }, {
      name: item.name,
      type: 'pie',
      radius: [70, 90],
      center: [center, '50%'],
      clockWise: false,
      label: {
        normal: {
          position: 'center',
          formatter: function (params) {
            if (params.name == "other") {
              return "";
            }
            return params.name + '\n' + params.value + '%' + (item.value[1] ? '\n\n\n' : '');
          },
          textStyle: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 18
          }
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [{
          value: 100 - item.value[0] > 0 ? 100 - item.value[0] : 0,
          name: 'other',
          itemStyle: {
            normal: {
              color: 'transparent',
            }
          }
        },
        {
          value: item.value[0],
          name: item.name,
          itemStyle: {
            normal: {
              color: color || '#01aef0'
            }
          }
        },
      ]
    }]);
  });
  return result;
}

function renderCircleBox(data) {
  return data.map(item => {
    return '<div class="circleChartBox js-circle-box"></div>'
  }).join('')
}

export function initInterest(selector, interest_dist, vsApp) {
  var $interestChart = document.getElementById(selector);
  var interestData = [];
  // var industry = getIndustry(globalData.details, globalData.details.master.user_select_cateid);

  for (var key in interest_dist) {
    if (interest_dist.hasOwnProperty(key)) {
      // var globalGti = '500+';
      // var industryGti = '--';
      // if (globalData.details.global && globalData.details.global.interest_dist &&
      //   globalData.details.global.interest_dist[key]) {
      //   globalGti = (interest_dist[key] / globalData.details.global.interest_dist[key]);
      //   globalGti = globalGti > 500 ? '500+' : globalGti;
      // }
      // if (industry && industry.interest_dist &&
      //   industry.interest_dist[key]) {
      //   industryGti = (interest_dist[key] / industry.interest_dist[key]);
      //   industryGti = industryGti > 500 ? '500+' : industryGti;
      // }
      var v = interest_dist[key] > 0 && interest_dist[key] < 0.001 ? (interest_dist[key] * 100).toFixed(3) : (interest_dist[key] * 100).toFixed(1)
      interestData.push({
        name: key,
        value: [v,
          // typeof globalGti === 'number' ? globalGti.toFixed(2) : globalGti,
          // typeof industryGti === 'number' ? industryGti.toFixed(2) : industryGti
        ],
      });
    }
  }
  var color = vsApp ? '#03ca99' : '#01aef0';
  $interestChart.style.width = interestData.length * 200 + 'px'
  // console.log(echarts.getInstanceByDom($interestChart), '$interestChart', $interestChart.style.width)
  var interestChart = echarts.getInstanceByDom($interestChart) || echarts.init($interestChart);
  var interestChartOptions = {
    series: createInterestSeries(interestData, color)
  };

  interestChart.setOption(interestChartOptions)
}

export function onlineCharts (myBarChart, data) {
  var color = ['#01aef0', '#03ca99', '#ff8c71', '#ffbd2e', '#1385d9', '#7f7fff', '#ff8c71', '#9be6ff']
  var series = [];
  var xData = [];
  let i = 0;
  for (var name in data) {
    if (data.hasOwnProperty(name)) {
      xData.push(name);
      series.push({
        value: data[name] * 100,
        name: name + '：' + (data[name] * 100).toFixed(2) + '',
        itemStyle: {
          normal: {
            color: color[i]
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (p) => {
              return (p.value).toFixed(2) + '%'
            }
          }
        }
      })
      i++
    }
  }
  // 柱形图
  var Baroption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: (params) => {
        const v = params[0].value
        return params[0].name + '<br />' + '<span class="chartCircleSpan" style="background: ' + params[0].color +
          '"></span>' + v.toFixed(2) + '%';
      }
    },
    grid: {
      top: '4%',
      left: '3%',
      right: '4%',
      bottom: '6%',
      containLabel: true
    },
    // dataZoom: [{
    //   handleStyle: {
    //     color: '#01aef0',
    //     borderWidth: '1',
    //     borderColor: '#01aef0'
    //   },
    //   type: 'slider',
    //   show: true,
    //   bottom: 15,
    //   xAxisIndex: [0],
    //   start: 0,
    //   end: (10 / xData.length) * 100
    // }],
    xAxis: [{
      type: 'category',
      data: xData,
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '网购习惯',
      type: 'bar',
      barWidth: '60%',
      data: series
    }]
  }
  myBarChart.setOption(Baroption)
}

export function basicmarryageCharts(marryChart, data) {
  var xData = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      xData.push(key);
    }
  }
  const color = ['#01aef0', '#03ca99', '#7f7fff', '#ffbd2e', '#1385d9'];
  xData.sort((x, y) => {
    if (isNaN(parseInt(x, 10))) {
      return -1
    }
    return parseInt(x, 10) - parseInt(y, 10)
  });
  const seriesData = xData.map((item, i) => {
    return {
      value: data[item],
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: (p) => {
            return (p.value * 100).toFixed(2) + '%'
          }
        }
      }
    };
  });
  var BarBoption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: (params) => {
        const v = params[0].value * 100
        return params[0].name + '<br />' + '<span class="chartCircleSpan" style="background: ' + params[0].color +
          '"></span>' + v.toFixed(2) + '%';
      }
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '3%',
      top: '6%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: xData,
      axisLine: {
        lineStyle: {
          color: '#c3cbd6'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#464c5b'
        }
      }
    }],
    yAxis: [{
      show: true,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '',
      type: 'bar',
      barWidth: 40,
      data: seriesData
    }]
  };
  marryChart.setOption(BarBoption)
}

export function basicsumptionCharts(chart, data) {
  var legend = [];
  var sData = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var value = data[key];
      legend.push({
        name: key,
        icon: 'rect'
      });
      sData.push({
        value: Number(value),
        name: key
      });
    }
  }
  var BarBoption = {
    // tooltip : {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
    // },
    color: ['#01aef0', '#7f7fff', '#03ca99'],
    legend: {
      orient: 'vertical',
      x: 10,
      y: 70,
      itemWidth: 14,
      data: legend
    },
    grid: {
      top: '20%'
    },
    avoidLabelOverlap: true,
    label: {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: false,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold'
        }
      }
    },
    series: [{
      name: '消费水平',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['60%', '50%'],
      label: {
        normal: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 13,
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: sData,
      markPoint: {
        symbol: 'path://M823.018 556.12c-4.976 0-10.584-0.54-16.463-1.63-5.61-1.262-6.695-4.43-3.893-9.672 1.27-1.9 6.156-9.495 15.014-22.254a827.367 827.367 0 0 1 29.664-40.606c10.945-14.47 20.805-27.947 30.575-40.609 9.226-12.75 15.008-20.706 17.002-24.053 5.335-8.321 2.077-18.36-9.404-30.117-1.905-2.175-6.156-5.432-12.572-9.772-5.969-4.16-11.76-7.32-16.914-9.405-8.5-3.07-14.476-3.706-18.182-1.538-3.345 2.084-7.956 6.783-13.108 14.29-2.085 3.077-7.24 10.853-15.74 22.978-8.232 12.474-17.091 25.323-26.504 39.158-9.315 13.923-17.995 26.316-25.77 37.259-7.957 11.31-12.304 17.816-13.208 20.08-1.988 4.07-6.06 5.88-11.848 4.795-5.7-1.09-9.494-3.712-11.482-7.962-1.27-2.077-5.788-8.321-14.2-18.542-8.412-9.853-17.367-21.161-26.594-34.092-9.224-12.939-18.353-24.509-27.22-35.82-8.956-11.21-14.835-18.808-18.085-23.238-9.411-18.002-19.265-23.785-29.573-17.368-7.33 4.162-13.932 8.68-19.72 13.386-5.701 4.976-11.124 8.956-16.278 12.213-10.4 7.232-11.938 16.912-4.706 28.574 17.636 21.162 33.375 40.794 46.94 58.968 11.393 14.835 22.247 28.947 32.832 43.14 10.309 13.571 16.546 21.527 18.54 23.88 2.166 4.072 0 6.328-6.244 6.328h-18.54c-5.155 0-12.843 0.18-22.606 0.724-10.04 0.546-19.176 0.366-27.586-0.724-8.233 0-15.105 1.897-20.35 6.334-5.064 4.072-6.692 9.404-4.525 15.732 1 4.437 1.539 10.764 1.539 19.086v19.445c0 5.154 1.448 8.141 4.706 8.68 3.167 0.456 6.693 0.634 10.943 0.634h90.62c12.302 0 18.54 2.623 18.54 7.963v30.202c0 5.52-0.905 8.142-3.07 8.142H580.905c-6.154-1.083-10.226 0.546-12.391 4.61-1.988 4.436-3.526 9.224-4.706 14.476-1.085 5.513-1.085 10.399 0 15.008 1.18 4.974 1.448 9.045 1.448 12.034 0 13.923 6.783 20.796 20.35 20.796h93.784c5.432 0 8.412 0.725 9.317 2.263 1 1.629 1.628 5.155 1.628 10.399 1.09 5.34 1.449 14.834 0.725 28.58-0.45 13.93-0.815 22.881-0.815 27.317 0 11.662 6.783 17.45 20.26 17.45h50.108c8.314 0 12.564-2.621 12.564-8.134V751.924c0-10.758 4.796-16.098 13.932-16.098h14.11c7.232 0 15.554-0.18 24.234-0.904 9.046-0.359 17.458-0.724 25.599-0.724h20.348c14.47 0 22.068-5.335 22.068-15.734V683.28c0-9.68-5.155-14.468-15.554-14.468H787.11c-10.219 2.255-15.739 0-15.739-6.335 0-2.98-0.18-7.051-0.726-11.847-0.537-4.789-0.627-9.046-0.627-13.476 0-4.072 1.629-7.417 5.335-9.405 3.801-2.262 7.685-3.347 11.757-3.347h92.247c10.22 0 15.56-3.526 15.56-11.121v-38.256c0-4.25-1.807-8.321-5.52-12.571-3.706-4.438-8.135-6.335-13.2-6.335h-53.179z m376.415-106.903c-12.393 3.167-22.068 9.412-28.946 18.182-6.693 9.224-10.219 18.36-10.943 28.123-0.36 9.502 2.263 19.086 7.783 28.761 5.969 9.412 14.29 16.283 25.95 20.535 10.226 4.43 18.182 10.763 23.337 19.077 5.334 8.687 8.143 17.638 8.68 27.23 0.546 9.582-1.441 18.718-5.513 27.04-4.072 8.502-10.404 15.014-18.719 19.079-25.96 12.937-39.614 28.31-40.428 46.307-1.27 18.001 8.68 32.285 29.483 43.14 9.405 4.25 17.002 10.762 22.605 19.808 5.789 9.048 8.868 18.542 9.502 28.76 0.539 9.861-1.449 19.085-5.7 26.863-4.07 8.321-10.943 13.564-20.17 17.002-12.571 3.167-22.066 8.858-29.117 17.457-6.513 8.315-10.04 17.449-10.585 26.855-0.724 9.86 1.897 19.265 7.776 28.766 5.7 9.673 14.836 17.63 27.22 24.054 8.51 4.25 14.291 10.943 18.004 19.81 3.704 9.22 4.974 17.816 4.07 26.316-1.268 8.502-4.07 16.278-8.866 22.97-4.608 7.052-11.123 10.4-19.623 10.4H368.55V199.15h826.089c8.321 0 15.014 3.257 19.803 10.399 4.616 6.878 7.059 14.476 7.783 23.068 0.539 8.59-1.449 17.001-5.7 25.411-4.07 8.412-10.943 14.38-20.17 17.458-9.404 3.25-17.001 8.59-22.79 16.009-5.789 7.32-9.046 15.732-10.219 24.597-0.904 9.13 1.263 17.727 6.328 26.318 5.34 8.59 14.11 14.925 26.682 19.08 9.226 4.257 17.001 10.584 22.612 19.174 5.603 8.59 9.045 17.187 9.404 26.138 0.546 9.314-1.627 17.636-6.147 25.779-4.616 7.776-12.213 13.476-22.79 16.636z m202.945 23.88c-8.134 2.256-14.29 6.693-17.994 13.745-3.348 6.693-5.52 14.47-5.52 22.792 0 8.68 2.082 16.822 5.52 24.688 3.704 8.143 9.86 13.751 17.994 16.823 8.322 3.346 15.015 9.68 19.633 19.084 4.787 9.675 7.41 19.625 7.775 30.39a85.45 85.45 0 0 1-3.891 30.208c-3.167 9.494-7.778 16.457-13.925 20.797-20.803 12.75-31.112 27.04-31.112 42.96 0 15.919 10.219 32.016 31.112 47.665 4.25 3.347 7.956 9.226 11.662 17.45 3.533 8.688 5.34 17.1 5.34 25.78 0 8.5-1.897 15.738-6.154 22.066-4.252 6.514-11.482 9.682-21.881 9.682h-84.292c-5.969 0-9.502-0.546-9.86-1.81-0.546-1.09 0.18-2.808 2.077-5.34 2.084-2.8 4.616-5.7 7.783-9.045 3.16-3.16 5.693-6.873 7.956-11.123 5.154-14.83 5.154-27.581 0-38.166-5.335-10.764-13.925-19.623-26.682-27.04-8.316-4.252-14.47-10.945-17.816-20.169-3.706-8.86-5.155-18.175-4.61-27.766 0.358-9.675 2.077-17.997 5.334-25.414 3.167-7.597 7.963-12.93 13.93-16.097 8.502-3.167 14.649-9.046 18.72-17.458 4.25-8.321 6.328-17.45 6.328-27.04 0-9.585-1.807-18.362-4.609-26.318-3.167-7.956-7.777-13.566-14.29-16.643-8.142-4.43-14.65-10.578-19.445-19.265-4.706-8.136-6.961-17.63-6.961-28.303 0-10.765 1.897-20.984 6.147-31.114 4.25-10.129 10.764-18.36 20.169-24.688 6.514-4.251 11.669-10.04 15.739-17.457 4.43-7.598 6.327-15.373 7.231-23.875 0.546-8.59-1.448-16.732-4.795-24.688-3.705-8.053-10.22-14.566-19.624-19.9-10.218-5.245-17.996-13.118-22.612-23.06-4.608-10.13-7.051-20.624-7.051-31.113 0-10.764 2.443-20.713 7.051-30.388 4.616-9.404 11.13-17.001 19.445-22.431 17.636-9.405 27.586-22.522 28.947-38.89 1.626-16.456 0.358-31.748-3.894-45.312-3.345-10.758-9.404-20.26-18.54-28.76-9.495-8.591-21.52-12.751-35.998-12.751H517.143V0h879.267c7.238 0 13.207 2.711 18.362 7.956 5.333 5.34 8.86 11.667 10.399 19.174 1.627 7.42 1.09 15.105-1.629 23.061-2.443 7.873-7.412 14.746-14.83 20.08-6.334 5.34-11.847 12.034-16.462 20.624-4.79 8.502-7.052 17.182-7.956 26.316-0.366 9.136 1.083 17.996 4.071 27.132 2.98 8.956 8.68 15.649 17.09 19.899 11.67 6.33 20.17 15.105 25.773 26.138 5.79 11.123 8.777 22.246 8.777 33.28 0 11.31-2.987 21.617-8.68 31.111-5.7 9.675-13.573 16.643-24.06 20.715-11.49 4.43-19.991 10.399-25.056 18.355-5.333 8.051-7.956 16.821-8.68 26.226-0.544 9.592 1.45 18.906 5.969 27.856 4.796 9.136 12.393 17.01 22.79 23.337 10.4 6.147 18.182 14.649 22.793 25.413 4.615 10.494 6.512 21.072 6.147 31.836-0.537 10.578-3.16 20.348-7.776 29.484-4.789 8.86-11.579 14.015-21.074 15.104zM129.605 127.52V86.009c0-21.072 8.224-40.882 24.233-58.879C169.846 9.136 187.393 0 206.114 0h215.614v127.52H129.605zM0 278.826c0-28.663 4.886-49.108 14.11-61.494 9.405-12.213 30.113-18.182 62.585-18.182H276.39v796.422h-85.74c-22.971 0-45.493-0.179-67.83-0.725-22.521-0.358-37.714-0.724-46.036-0.724-28.125 1.09-47.936-3.706-59.417-14.469C5.968 969.075 0.09 948.728 0.09 919.057V689.795c0-11.669 1.987-20.535 5.52-26.138 3.526-5.788 11.123-9.86 22.605-12.033 4.25 0 9.77-1.628 17.278-4.788 7.141-3.348 14.468-8.502 21.707-15.38 7.232-6.874 13.566-15.734 18.72-27.043 5.155-11.033 7.867-24.509 7.867-40.606 0-24.421-6.418-43.41-19.445-57.25-13.02-13.746-26.952-21.888-41.601-23.785-11.309-2.077-19.72-5.7-24.875-10.399C2.62 467.4 0 459.256 0 447.596v-168.77z',
        symbolSize: [44, 33],
        symbolOffset: [0, 0],
        data: [{
          x: '60%',
          y: '50%'
        }],
        tooltip: {
          show: false
        },
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#d7dde4'
          },
          emphasis: {
            color: '#d7dde4'
          }
        }
      },
      itemStyle: {
        normal: {
          borderWidth: 3,
          borderColor: '#fff'
        },
        emphasis: {
          borderWidth: 0,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  chart.setOption(BarBoption)
}
