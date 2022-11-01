/*
 * @Author: wusiyuan
 * @Date: 2022-07-29 11:26:07
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:26:37
 * @Description:
 */
import { useEffect } from 'react';
import * as echarts from 'echarts';
// import { useHistory } from 'react-router';

const Line = () => {
  useEffect(() => {
    let yearData = [
      {
        year: '2020', // 年份
        data: [
          // 两个数组是因为有两条线
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        ],
      },
      {
        year: '2021', // 年份
        data: [
          // 两个数组是因为有两条线
          [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
          [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
        ],
      },
    ];
    // 1. 实例化对象
    let myChart = echarts.init(document.getElementById('lineone'));
    // 2.指定配置
    let option = {
      // 通过这个color修改两条线的颜色
      color: ['#00f2f1', '#ed3f35'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        // 如果series 对象有name 值，则 legend可以不用写data
        // 修改图例组件 文字颜色
        textStyle: {
          color: '#4c9bfd',
        },
        // 这个10% 必须加引号
        right: '10%',
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '-1%',
        show: true, // 显示边框
        borderColor: '#012f4a', // 边框颜色
        containLabel: true, // 包含刻度文字在内
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisTick: {
          show: false, // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd', // 文本颜色
        },
        axisLine: {
          show: false, // 去除轴线
        },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false, // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd', // 文本颜色
        },
        axisLine: {
          show: false, // 去除轴线
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a', // 分割线颜色
          },
        },
      },
      series: [
        {
          name: '新增粉丝',
          type: 'line',
          // true 可以让我们的折线显示带有弧度
          smooth: true,
          data: yearData[0].data[0],
        },
        {
          name: '新增游客',
          type: 'line',
          smooth: true,
          data: yearData[0].data[1],
        },
      ],
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
      if (document.getElementById('lineone') !== null)
        myChart && myChart.resize();
    });

    // 5.点击切换效果
    myChart.on('click', 'a', function () {
      // alert(1);
      // console.log($(this).index());
      // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
      // console.log(yearData[$(this).index()]);
      let obj = yearData[myChart.index()];
      option.series[0].data = obj.data[0];
      option.series[1].data = obj.data[1];
      // 需要重新渲染
      myChart.setOption(option);
    });
  }, []);

  return (
    <div
      id='lineone'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    ></div>
  );
};

export default Line;
