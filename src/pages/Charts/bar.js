/*
 * @Author: wusiyuan
 * @Date: 2022-07-29 11:26:07
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:27:10
 * @Description:
 */
import { useEffect } from 'react';
import * as echarts from 'echarts';
// import { useHistory } from 'react-router';

const Bar = () => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('demo'));
    //指定图表的配置
    let option = {
      color: ['#2f89cf'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['旅游', '教育培训', '直播', '医疗', '电商', '社交', '金融'],
          axisTick: {
            alignWithLabel: true,
          },
          // 修改刻度标签 相关样式
          axisLabel: {
            color: 'rgba(255,255,255,.6) ',
            fontSize: '12',
            interval: 0, //显示所有文字
          },
          // 不显示x坐标轴的样式
          axisLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          // 修改刻度标签 相关样式
          axisLabel: {
            color: 'rgba(255,255,255,.6) ',
            fontSize: 12,
          },
          // y轴的线条改为了 2像素
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              width: 2,
            },
          },
          // y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '35%',
          data: [200, 300, 300, 900, 1500, 1200, 600],
          itemStyle: {
            // 修改柱子圆角
            barBorderRadius: 5,
          },
        },
      ],
    };
    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
      if (document.getElementById('demo') !== null)
        myChart && myChart.resize();
    });
  }, []);

  return (
    <div
      id='demo'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
        margin: '0 auto',
      }}
    ></div>
  );
};

export default Bar;
