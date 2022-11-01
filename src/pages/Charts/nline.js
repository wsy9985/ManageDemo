/*
 * @Author: wusiyuan
 * @Date: 2022-09-05 14:17:23
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:26:01
 * @Description:
 */

/*
 * @Author: wusiyuan
 * @Date: 2022-09-03 16:51:14
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-03 16:58:21
 * @Description:
 */

import { useEffect } from 'react';
import * as echarts from 'echarts';
// import { useHistory } from 'react-router';

const Nline = () => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('demo3'));
    let option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: '0%',
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        },
      },

      grid: {
        left: '10',
        top: '40',
        right: '10',
        bottom: '-1%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          // x轴更换数据
          data: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '26',
            '28',
            '29',
            '30',
          ],
          // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12,
            },
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12,
            },
          },
          // 修改分割线的颜色
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
        },
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          smooth: true,
          // 单独修改当前线条的样式
          lineStyle: {
            color: '#0184d5',
            width: '2',
          },
          // 填充颜色设置
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(1, 132, 213, 0.4)', // 渐变色的起始颜色
                },
                {
                  offset: 0.8,
                  color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
                },
              ],
              false
            ),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          // 设置拐点
          symbol: 'circle',
          // 拐点大小
          symbolSize: 8,
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
          // 设置拐点颜色以及边框
          itemStyle: {
            color: '#0184d5',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
          data: [
            30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30,
            60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40,
          ],
        },
        {
          name: '联盟广告',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              color: '#00d887',
              width: 2,
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)',
                  },
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
          // 设置拐点 小圆点
          symbol: 'circle',
          // 拐点大小
          symbolSize: 5,
          // 设置拐点颜色以及边框
          itemStyle: {
            color: '#00d887',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
          data: [
            130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40,
            130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20,
          ],
        },
      ],
    };
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
      if (document.getElementById('demo3') !== null)
      myChart && myChart.resize();
    });
  }, []);

  return (
    <div
      id='demo3'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    ></div>
  );
};

export default Nline;
