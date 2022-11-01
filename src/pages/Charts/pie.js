/*
 * @Author: wusiyuan
 * @Date: 2022-07-29 11:26:07
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:25:47
 * @Description:
 */
import { useEffect } from 'react';
import * as echarts from 'echarts';
// import { useHistory } from 'react-router';

const Pie = () => {
  useEffect(() => {
    // 1. 实例化对象
    let myChart = echarts.init(document.getElementById('demo'));
    // 2.指定配置
    let option = {
      color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },

      legend: {
        bottom: '0%',
        // 修改小图标的大小
        itemWidth: 10,
        itemHeight: 10,
        // 修改图例组件的文字为 12px
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        },
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          // 这个radius可以修改饼形图的大小
          // radius 第一个值是内圆的半径 第二个值是外圆的半径
          radius: ['40%', '60%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          // 图形上的文字
          label: {
            show: false,
            position: 'center',
          },
          // 链接文字和图形的线是否显示
          labelLine: {
            show: false,
          },
          data: [
            { value: 1, name: '0岁以下' },
            { value: 4, name: '20-29岁' },
            { value: 2, name: '30-39岁' },
            { value: 2, name: '40-49岁' },
            { value: 1, name: '50岁以上' },
          ],
        },
      ],
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
      if (document.getElementById('demo') !== null) myChart && myChart.resize();
    });
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    >
      <div
        id='demo'
        style={{
          width: '100%',
          height: `calc(100% - ${40 / 192 + 'rem'})`,
        }}
      ></div>
    </div>
  );
};

export default Pie;
