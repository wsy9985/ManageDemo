/*
 * @Author: wusiyuan
 * @Date: 2022-09-14 14:52:25
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-17 09:05:07
 * @Description:
 */
import { useEffect, useState, useRef } from 'react';
import { message, Drawer, Button } from 'antd';

import './index.css';

const AMap = window.AMap;
let arr = []; //存储点位群组
let myAMap = null; //map容器
let marker = null; //点位容器
let polygonMarker = null; //多边点位
let geocoder = null; //地址解析全局变量
let districtSearch = null; //获取边界
let bounds = null; //边界点位

const MyMap = () => {
  const [markVisible, setMarkVisible] = useState(false); //点位抽屉是否可见
  const [title, setTitle] = useState(''); //抽屉Title
  const [lng, setLng] = useState(''); //经度设置
  const [lat, setLat] = useState(''); //维度设置
  const mapRef = useRef(null); //存储地图实例
  useEffect(() => {
    fetch('http://api.map.baidu.com/api?v=2.0&ak=OIqyrNepDBfmsNGzLqfPuI26',{
      method:'get',
    }).then(
      async res => {
        res = await res.json()
      }
    )
    creactMap(); //地图
    return () => {
      myAMap.destroy();
      myAMap = null;
    };
  }, []);

  /**
   * @desc: 绘制地图
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-16 16:18:30
   * @update:
   */
  const creactMap = () => {
    districtSearch = new AMap.DistrictSearch({
      level: 'city',
      subdistrict: 0,
      extensions: 'all',
    });
    districtSearch.search('合肥', (status, result) => {
      let mask = [];
      bounds = result.districtList[0].boundaries;
      for (var i = 0; i < bounds.length; i += 1) {
        mask.push([bounds[i]]);
      }
      myAMap = new AMap.Map(document.getElementById('container1'), {
        mask: mask,
        zoom: 9,
        viewMode: '3D',
        center: [117.227308, 31.82057],
        mapStyle: 'amap://styles/da9fc0ec10b240dbff5f1da5cb011ae8',
        pitch: 20,
      });
      //添加高度面
      let object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
      myAMap.add(object3Dlayer);
      let wall = new AMap.Object3D.Wall({
        path: bounds,
        height: -20000,
        color: '#0088ffcc',
      });
      wall.transparent = true;
      object3Dlayer.add(wall);
      geocoder = new AMap.Geocoder({
        radius: 1000,
      });
      handlePolygon(result);
      createMarker();
      createWindowInfo();
    });
  };

  const handlePolygon = (result) => {
    if (bounds) {
      for (let i = 0; i < bounds.length; i++) {
        let polygon = new AMap.Polygon({
          map: myAMap,
          // strokeWeight: 4,
          path: bounds[i],
          strokeWeight: 1,
          fillOpacity: 0.2,
          fillColor: '#256edc',
          strokeColor: '256edc',
        });
      }
    }
  };

  /**
   * @desc: 绘制点位
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-16 16:17:39
   * @update:
   */
  const createMarker = () => {
    marker = new AMap.Marker({
      title: '合肥市政府',
      position: myAMap.getCenter(),
      draggable: true,
      offset: new AMap.Pixel(-1, -8),
    });
    myAMap.add(marker);
    /* 打开抽屉 */
    marker.on('click', async function () {
      // 转换地址信息时传递的经纬度必须为数组
      let centerArr = [this.getPosition().lng, this.getPosition().lat];
      let address = await regeoCode(centerArr);
      setTitle(address);
      setLng(centerArr[0]);
      setLat(centerArr[1]);
      setMarkVisible(true);
    });
    /* 点位移动时聚焦中心位置 */
    marker.on('dragend', function () {
      myAMap.setCenter([this.getPosition().lng, this.getPosition().lat]);
    });
  };

  /**
   * @Author: shengyushan
   * @descripttion: 根据经纬度查询地址
   * @param {经纬度} lnglat
   * @return {地址}
   */
  const regeoCode = (lnglat) => {
    return new Promise((resolve, reject) => {
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
          let address = result.regeocode.formattedAddress;
          resolve(address);
        } else {
          resolve('');
          message.destroy();
          message.error('根据经纬度查询地址失败');
        }
      });
    });
  };

  /**
   * @desc: 绘制信息窗体
   * @param {数据实例} data
   * @author: wsy
   * @Date: 2022-09-19 09:40:40
   * @update:
   */
  const createWindowInfo = (data) => {
    // 定义内容数组存储data实例
    const content = [];
    content.push(`<img src=${data.img}>地址: ${data.address}`);
    content.push(`电话:${data.phone}`);
    content.push(
      `<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>
        详细信息</a>`
    );

    const info = document.createElement('div');
    info.className = 'custom-info input-card content-window-card';
    // 定义顶部标题
    const top = document.createElement('div');
    const titleD = document.createElement('div');
    const closeX = document.createElement('img');
    closeX.src = 'https://webapi.amap.com/images/close2.gif';
    top.className = 'info-top';
    titleD.innerHTML = data.title;
    closeX.onclick = () => {
      myAMap.clearInfoWindow();
    };
    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    const middle = document.createElement('div');
    middle.className = 'info-middle';
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content.join(`<br/>`);
    info.appendChild(middle);

    // 定义底部内容
    const bottom = document.createElement('div');
    bottom.className = 'info-bottom';
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    const sharp = document.createElement('img');
    sharp.src = 'https://webapi.amap.com/images/sharp.png';
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
  };

  /**
   * @desc: 绘制窗体
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-16 16:53:25
   * @update:
   */
  const createWindow = () => {
    /* 创建窗体 */
    const infoWindow = new AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      offset: new AMap.Pixel(15, -52),
    });
    /* 创建新的点位 */
    const newMarker = new AMap.Marker({
      position: new AMap.LngLat(116.481181, 39.989792),
      extData: {
        id: 2,
        title:
          '方恒假日酒店<span style="font-size:11px;color:#F00;margin-left:3px">价格:318/天</span>',
        img: 'http://tpc.googlesyndication.com/simgad/5843493769827749134',
        address: '北京市朝阳区阜通东大街6号院3号楼东北8.3公里',
        phone: '010-64733333',
      },
    });
    /* 点击事件 */
    newMarker.on('click', function () {
      infoWindow.setContent(createWindowInfo(this.getExtData()));
      if (!infoWindow.getIsOpen()) {
        infoWindow.open(myAMap, this.getPosition());
      }
    });
    /* 添加点位 */
    myAMap.add(newMarker);
  };

  return (
    <div>
      <div id='container1'></div>
      <Drawer
        destroyOnClose
        visible={markVisible}
        title={title}
        onClose={() => setMarkVisible(false)}
      >
        {'经度: ' + lng + ' , 纬度: ' + lat}
      </Drawer>
    </div>
  );
};

export default MyMap;
