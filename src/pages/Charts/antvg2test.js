/*
 * @Author: wusiyuan
 * @Date: 2022-09-13 10:06:36
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-14 13:56:00
 * @Description:
 */
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const data = [
  { type: '汽车', value: 34 },
  { type: '建材家居', value: 85 },
  { type: '住宿旅游', value: 103 },
  { type: '交通运输仓储邮政', value: 142 },
  { type: '建筑房地产', value: 251 },
  { type: '教育', value: 367 },
  { type: 'IT 通讯电子', value: 491 },
  { type: '社会公共管理', value: 672 },
  { type: '医疗卫生', value: 868 },
  { type: '金融保险', value: 1234 },
];

const DrawChart = () => {
  const myChart = useRef();
  useEffect(() => {
    const { current } = myChart;
    if (!current) {
      const chart = new Chart({
        container: 'container1',
        autoFit: true,
        // height: 500,
      });
      chart.data(data);
      chart.scale({
        value: {
          max: 1400,
          min: 0,
          alias: '销量（百万）',
        },
      });
      chart.axis('type', {
        title: null,
        tickLine: null,
        line: null,
        label: {
          style: {
            fill: '#cccccc',
          },
          offset: 10,
        },
      });

      chart.axis('value', {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 12,
            fontWeight: 300,
            fill: '#0084f7',
          },
        },
        // position: 'end',
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart
        .interval()
        .position('type*value')
        .size(10)
        .label('value', {
          style: {
            fill: '#0084f7',
          },
          offset: 10,
        });
      chart.interaction('element-active');
      chart.render();
      myChart.current = chart;
    }
  }, []);

  return (
    <div
      id='container1'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    ></div>
  );
};

export default DrawChart;
