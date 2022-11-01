import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { reqWeather, reqIP } from '../../request/api';
import eventBus from '../../request/utils';
import './index.css';

export default function Bread() {
  const { pathname } = useLocation();
  const [breadName, setBreadName] = useState('');
  // const [currentTime, setCurrentTime] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [city, setCity] = useState('');
  const [windpower, setWindpower] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const getWeather = async () => {
    const key = '5f582d5aba14bbfabb74ef67b6e2fb04';
    //获取IP
    const resultIp = await reqIP({ key });
    const { status, adcode, infocode } = resultIp;
    if (status === '1' && infocode === '10000') {
      //根据IP获取地区及天气信息
      const resultWeather = await reqWeather({
        key,
        city: adcode,
        extensions: 'base',
      });
      const { status, infocode, lives } = resultWeather;
      if (status === '1' && infocode === '10000') {
        const { province, city, temperature, weather, windpower } = lives[0];
        setCity(province + '省-' + city);
        setTemperature(`${temperature}℃`);
        setWeather(weather);
        setWindpower(windpower);
      }
    }
  };

  /* const getTime = () => {
    setCurrentTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
  }; */

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    eventBus.emit('collapsedParam', !collapsed);
  };

  // 不是在组件加载时去获取路径,而是路径一旦发生变化,才获取对应路径名称
  useEffect(() => {
    switch (pathname) {
      case '/app':
        setBreadName('首页');
        break;
      case '/app/home':
        setBreadName('首页');
        break;
      case '/app/list':
        setBreadName('查看文章列表(Table)');
        break;
      case '/app/listT':
        setBreadName('查看文章列表(List)');
        break;
      case '/app/edit':
        setBreadName('编辑文章');
        break;
      case '/app/users':
        setBreadName('用户管理');
        break;
      case '/app/datas/category':
        setBreadName('品类管理');
        break;
      case '/app/datas/goods':
        setBreadName('图书一览');
        break;
      case '/app/charts/antvg2':
        setBreadName('AntvG2');
        break;
      case '/app/charts/antvg2test':
        setBreadName('AntvG2-Bar');
        break;
      case '/app/charts/pie':
        setBreadName('饼图Ⅰ');
        break;
      case '/app/charts/npie':
        setBreadName('饼图Ⅱ');
        break;
      case '/app/charts/bar':
        setBreadName('条形图Ⅰ');
        break;
      case '/app/charts/nbar':
        setBreadName('条形图Ⅱ');
        break;
      case '/app/charts/line':
        setBreadName('折线图Ⅰ');
        break;
      case '/app/charts/nline':
        setBreadName('折线图Ⅱ');
        break;
      case '/app/plant':
        setBreadName('echarts可视化');
        break;
      case '/app/amap':
        setBreadName('高德地图');
        break;
      case '/app/disamap':
        setBreadName('高德地图Ⅱ');
        break;
      case '/app/setting':
        setBreadName('设置');
        break;
      case '/app/setting/modify':
        setBreadName('修改资料');
        break;
      case '/app/setting/exchange':
        setBreadName('切换账号');
        break;
      case '/app/setting/timepicker':
        setBreadName('时间范围选择器');
        break;
      default:
        setBreadName(pathname.includes('edit') ? '文章编辑' : '');
        break;
    }
  }, [pathname]);

  useEffect(() => {
    getWeather();
    /* setTimeout(() => {
      getTime();
    }, 1000); */
  });

  useEffect(() => {
    // eventBus.on('collapsedParam',)
    clearInterval(window.timer);
  }, []);
  return (
    <div className='bread'>
      <div className='case'>
        <Breadcrumb>
          <Col className='homeButton'>
            <Button type='link' onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Col>
          <Breadcrumb.Item href='/app'>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{breadName}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='homeHeader'>
        <div className='header-bottom-right'>
          {/* <span>北京时间&nbsp;:&nbsp;{currentTime}</span> */}
          {/* <img src={dayPictureUrl} alt="weather"/> */}
          <span className='time' style={{ fontSize: '14px' }}>
            {city}
          </span>
          <span style={{ fontSize: '14px' }}>
            {weather}&nbsp;
            {temperature}&nbsp;&nbsp;
            {' 当前风力: ' + windpower + '级'}
          </span>
        </div>
      </div>
    </div>
  );
}
