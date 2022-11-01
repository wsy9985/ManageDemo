/*
 * @Author: wusiyuan
 * @Date: 2022-07-29 11:26:07
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-13 16:32:25
 * @Description:
 */
import { useEffect } from 'react';
import * as echarts from 'echarts';
// import { useHistory } from 'react-router';

const Npie = () => {
  useEffect(() => {
    // 1. 实例化对象
    let myChart = echarts.init(document.getElementById('demo4'));
    let pieData = [
      { value: 20, name: '云南' },
      { value: 26, name: '北京' },
      { value: 24, name: '山东' },
      { value: 25, name: '安徽' },
      { value: 20, name: '江苏' },
      { value: 25, name: '浙江' },
      { value: 30, name: '四川' },
      { value: 42, name: '湖北' },
    ];
    let colorList = [
      '#006cff',
      '#60cda0',
      '#ed8884',
      '#ff9f7f',
      '#0096ff',
      '#9fe6b8',
      '#32c5e9',
      '#1d9dff',
    ];
    let option = {
      color: colorList,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        bottom: '-3%',
        left:'0%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        },
      },
      series: [
        {
          name: '地区分布',
          type: 'pie',
          radius: ['10%', '70%'],
          center: ['50%', '45%'],
          roseType: 'radius',
          // 图形的文字标签
          label: {
            fontSize: 10,
          },
          // 链接图形和文字的线条
          labelLine: {
            // length 链接图形的线条
            length: 6,
            // length2 链接文字的线条
            length2: 8,
          },
          data: pieData.map((item, index) => {
            item.label = {
              color: colorList[index],
            };
            return item;
          }),
          itemStyle: {
            color: (params) => {
              let index = params.dataIndex;
              return colorList[index];
            },
          },
        },
      ],
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener('resize', function () {
      if (document.getElementById('demo4') !== null)
      myChart && myChart.resize();
    });
  }, []);

  return (
    <div
      id='demo4'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    ></div>
  );
};

export default Npie;
