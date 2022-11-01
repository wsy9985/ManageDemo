/*
 * @Author: wusiyuan
 * @Date: 2022-09-03 16:51:14
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:26:12
 * @Description:
 */

import { useEffect } from 'react';
import * as echarts from 'echarts';

// import { useHistory } from 'react-router';

const Nbar = () => {
  useEffect(() => {
    let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
    // 1. 实例化对象
    let myChart = echarts.init(document.getElementById('demo5'));
    // 2. 指定配置和数据
    let option = {
      grid: {
        top: '10%',
        left: '16%',
        bottom: '10%',
        // containLabel: true
      },
      // 不显示x轴的相关信息
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          data: ['HTML5', 'CSS3', 'JavaScript', 'VUE', 'REACT'],
          // 不显示y轴的线
          axisLine: {
            show: false,
          },
          // 不显示刻度
          axisTick: {
            show: false,
          },
          // 把刻度标签里面的文字颜色设置为白色
          axisLabel: {
            color: '#fff',
          },
        },
        {
          data: [702, 350, 610, 793, 664],
          inverse: true,
          // 不显示y轴的线
          axisLine: {
            show: false,
          },
          // 不显示刻度
          axisTick: {
            show: false,
          },
          // 把刻度标签里面的文字颜色设置为白色
          axisLabel: {
            color: '#fff',
          },
        },
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          data: [70, 34, 60, 78, 69],
          yAxisIndex: 0,
          // 修改第一组柱子的圆角
          itemStyle: {
            barBorderRadius: 20,
            // 此时的color 可以修改柱子的颜色
            color: function (params) {
              // params 传进来的是柱子对象
              // console.log(params);
              // dataIndex 是当前柱子的索引号
              return myColor[params.dataIndex];
            },
          },
          // 柱子之间的距离
          barCategoryGap: 50,
          //柱子的宽度
          barWidth: 10,
          // 显示柱子内的文字
          label: {
            show: true,
            position: 'inside',
            // {c} 会自动的解析为 数据  data里面的数据
            formatter: '{c}%',
          },
        },
        {
          name: '框',
          type: 'bar',
          barCategoryGap: 50,
          barWidth: 15,
          yAxisIndex: 1,
          data: [100, 100, 100, 100, 100],
          itemStyle: {
            color: 'none',
            borderColor: '#00c1de',
            borderWidth: 3,
            barBorderRadius: 15,
          },
        },
      ],
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
      if (document.getElementById('demo5') !== null)
        myChart && myChart.resize();
    });
  }, []);

  return (
    <div
      id='demo5'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
        margin: '0 auto',
      }}
    ></div>
  );
};

export default Nbar;
