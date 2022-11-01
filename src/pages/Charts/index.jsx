/*
 * @Author: wusiyuan
 * @Date: 2022-09-05 15:22:07
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-20 17:38:52
 * @Description:
 */
import Bar from './bar';
// import Nbar from './nbar';
import Line from './line';
import Nline from './nline';
// import Pie from './pie';
import Npie from './npie';
import Emap from './map';
import AntvG2 from './antvg2';
import AntvG2Bar from './antvg2test';
import '../../request/flexible';
import './index.css';
import '../../comcss/reset.css';
import { useEffect, useState } from 'react';
import moment from 'moment';

const PlantLine = () => {
  const [Time, setTime] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setTime(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'));
    }, [1000]);
  });
  return (
    <div className='plant-line'>
      <div className='plant-header'>
        <h1>数据可视化一张图</h1>
        <div className='showTime'>当前时间 :&nbsp; {Time}</div>
      </div>
      <div className='plant-body'>
        {/* 左侧两行 */}
        <div className='column'>
          {/* 左侧图一 */}
          <div className='panel'>
            <h2>Echarts-柱状图</h2>
            <div className='bar'>
              <Bar />
            </div>
            <div className='panel-footer'></div>
          </div>
          {/* 左侧图二 */}
          <div className='panel'>
            <h2>Echats-折线图Ⅰ</h2>
            <div className='bar'>
              <Line />
            </div>
            <div className='panel-footer'></div>
          </div>
          {/* 左侧图三 */}
          <div className='panel'>
            <h2>AntvG2-柱状图</h2>
            <div className='bar'>
              <AntvG2 />
            </div>
            <div className='panel-footer'></div>
          </div>
        </div>
        {/* 中间主体 */}
        <div className='column'>
          <div className='panel-number'>
            <div className='number'>
              <ul>
                <li>123456</li>
                <li>987654</li>
              </ul>
            </div>
            <div className='text'>
              <ul>
                <li>市场需求人数</li>
                <li>市场供应人数</li>
              </ul>
            </div>
          </div>
          <div className='map'>
            <div className='map-content'></div>
            <div className='map-content-two'></div>
            <div className='map-content-three'></div>
            <div className='map-plant'>
              <Emap />
            </div>
          </div>
        </div>
        {/* 右侧两行 */}
        <div className='column'>
          <div className='panel'>
            <h2>Echarts-南丁格尔玫瑰图</h2>
            <div className='bar'>
              <Npie />
            </div>
            <div className='panel-footer'></div>
          </div>
          <div className='panel'>
            <h2>Echats-折线图Ⅱ</h2>
            <div className='bar'>
              <Nline />
            </div>
            <div className='panel-footer'></div>
          </div>
          <div className='panel'>
            <h2>AntvG2-条形图</h2>
            <div className='bar'>
              <AntvG2Bar />
            </div>
            <div className='panel-footer'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantLine;
