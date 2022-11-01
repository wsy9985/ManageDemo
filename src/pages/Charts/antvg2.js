/*
 * @Author: wusiyuan
 * @Date: 2022-09-09 16:24:10
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-14 14:02:33
 * @Description:
 */
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const DrowChart = () => {
  // const location = useLocation();
  const myChart = useRef();
  useEffect(() => {
    const { current } = myChart;
    // 创建Chart对象
    if (!current) {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
      });
      // 载入数据源
      chart.data(data);
      // 创建图形语法,绘制柱状图
      chart.interval().position('genre*sold');
      chart.render();
      myChart.current = chart;
    }
  }, []);

  return (
    <div
      id='container'
      style={{
        width: '100%',
        height: `calc(100% - ${40 / 192 + 'rem'})`,
      }}
    ></div>
  );
};

export default DrowChart;
