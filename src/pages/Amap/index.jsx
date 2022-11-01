/*
 * @Author: wusiyuan
 * @Date: 2022-09-14 14:52:25
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-27 11:50:43
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
let polyEditor = null; //折线容器
let polygonEditor = null; //多边形容器
let polyline = null; //折线实例1
let polyline2 = null; //折线实例2
let bezierCurve = null; //弧线实例
let polygon = null; //多边形实例
let overlayGroup = null; //点位群组实例
let bezierCurveEditor = null; //贝塞尔曲线

const MyMap = () => {
  const [markVisible, setMarkVisible] = useState(false); //点位抽屉是否可见
  const [visible, setVisible] = useState(false); //隐藏拦截
  const [keyFlag, setKeyFlag] = useState(false); //一键显隐
  const [editFlag, setEditFlag] = useState(true); //折线隐藏时是否可编辑
  const [ploygonFlag, setPloygonFlag] = useState(true); //多边隐藏时是否可编辑
  const [finishedFlag, setFinishedFlag] = useState(true); //编辑完成隐藏标志
  const [title, setTitle] = useState(''); //抽屉Title
  const [lng, setLng] = useState(''); //经度设置
  const [lat, setLat] = useState(''); //维度设置
  const mapRef = useRef(null); //存储地图实例
  useEffect(() => {
    creactMap(); //地图
    createMarker(); //点位
    createWindow(); //信息窗体 + 图形
    // createAdvancedWindow(); //高级信息窗体
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
    myAMap = new AMap.Map(document.getElementById('container'), {
      zoom: 16,
      viewMode: '3D',
      // isHotPot: true,
      center: [116.397029, 39.91784],
    });
    geocoder = new AMap.Geocoder({
      radius: 1000,
    });
    // myAMap.setCity('合肥');
    /* 地图加载完成的事件 */
    myAMap.on('complete', function () {
      message.destroy();
      message.success('myAMap is complete');
    });
    /* 地图缩放级别更改后触发 */
    myAMap.on('zoomchange', function () {
      message.destroy();
      message.success(myAMap.getZoom());
    });
    /* 停止拖住地图时触发,如地图有拖拽欢动效果,则在拖拽停止,缓动开始前触发 */
    myAMap.on('dragend', function () {
      message.destroy();
      message.success(myAMap.getCenter().lng);
    });
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
      title: '故宫博物院',
      position: myAMap.getCenter(),
      draggable: true,
      offset: new AMap.Pixel(0, -5),
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
    // let lnglat = [116.396574, 39.992706];
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
    drawLine();
    drawBezierCurve();
    drawPolygon();
  };

  /**
   * @desc: 绘制高级窗体
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-19 16:00:38
   * @update:
   */
  const createAdvancedWindow = () => {
    let LngLat = [116.31094, 39.993602];
    let content =
      '<div class="info-title">高德地图</div><div class="info-content">' +
      '<img src="https://webapi.amap.com/images/amap.jpg">' +
      '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br/>' +
      '<a target="_blank" href = "https://mobile.amap.com/">点击下载高德地图</a></div>';
    /* 创建高级窗体 */
    const advancedInfoWindow = new AMap.AdvancedInfoWindow({
      isCustom: true,
      content: content,
      offset: new AMap.Pixel(0, -30),
    });
    /* 创建新的点位 */
    const newMarker = new AMap.Marker({
      position: LngLat,
    });
    /* 点击事件 */
    newMarker.on('click', function () {
      if (!advancedInfoWindow.getIsOpen()) {
        advancedInfoWindow.open(myAMap, LngLat);
      }
    });
    /* 添加点位 */
    myAMap.add(newMarker);
  };

  /**
   * @desc: 绘制折线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-19 17:55:35
   * @update:
   */
  const drawLine = () => {
    /* 点位路径 */
    const path = [
      [116.362209, 39.887487],
      [116.422897, 39.878002],
      [116.372105, 39.90651],
      [116.428945, 39.89663],
    ];
    const path2 = [
      [116.362209, 39.887487],
      [116.428945, 39.89663],
    ];
    /* 创建折线实例 */
    polyline = new AMap.Polyline({
      map: myAMap,
      path: path,
      strokeWeight: 4,
      strokeOpacity: 0.7,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10], //[10,2,10] (实虚)
      isOutline: true, //是否带描边
    });
    polyline2 = new AMap.Polyline({
      map: myAMap,
      path: path2,
      strokeWeight: 4,
      strokeColor: '#ff0000',
      strokeOpacity: 0.7,
    });
    myAMap.setFitView([polyline, polyline2]); //自动适配视野
    myAMap.plugin(['AMap.PolyEditor'], function () {
      polyEditor = new AMap.PolyEditor(myAMap, polyline);
      polyEditor.on('end', function ({ type, target }) {
        console.log(type, target.getPath());
      });
    });
  };

  /**
   * @desc: 绘制弧线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-19 17:55:35
   * @update:
   */
  const drawBezierCurve = () => {
    /* 点位路径 */
    const path = [
      //每个弧线段有两种描述方式
      [116.39, 39.91, 116.37, 39.91], //起点
      //第一段弧线
      [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
      //第二段弧线
      [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
      //第三段弧线
      [
        //弧线段有两种描述方式2
        [116.392872, 39.887391], //控制点
        [116.40772, 39.909252], //控制点
        [116.41, 39.89], //途经点
      ],
      //第四段弧线
      [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273],
      //控制点，控制点，途经点，每段最多两个控制点
    ];

    /* 创建折线实例 */
    bezierCurve = new AMap.BezierCurve({
      map: myAMap,
      path: path,
      strokeColor: '#00ff62',
      strokeOpacity: 0.7,
      strokeWeight: 4,
    });
    myAMap.setFitView([bezierCurve]); //自动适配视野
    bezierCurveEditor = new AMap.BezierCurveEditor(myAMap, bezierCurve);
    bezierCurveEditor.on('end', function ({ type, target }) {
      console.log(target.getPath());
    });
  };

  /**
   * @desc: 绘制多边形
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-21 11:09:57
   * @update:
   */
  const drawPolygon = () => {
    /* 多边形路径 */
    const path = [
      [116.403322, 39.920255],
      [116.410703, 39.897555],
      [116.402292, 39.892353],
      [116.389846, 39.891365],
    ];
    polygon = new AMap.Polygon({
      map: myAMap,
      path: path,
    });
    polygonEditor = new AMap.PolyEditor(myAMap, polygon);
    polygonEditor.on('end', function ({ _, target }) {
      if (arr) {
        myAMap.remove(arr);
        arr = [];
      }
      for (let i = 0; i < target.getPath().length; i++) {
        polygonMarker = new AMap.Marker({
          offset: new AMap.Pixel(-9, -32),
          position: target.getPath()[i],
          icon:
            'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' +
            (i + 1) +
            '.png',
          extData: {
            id: i + 1,
          },
        });
        myAMap.add(polygonMarker);
        polygonMarker.on('click', async function () {
          // 转换地址信息时传递的经纬度必须为数组
          let centerArr = [this.getPosition().lng, this.getPosition().lat];
          let address = await regeoCode(centerArr);
          setTitle(address);
          setLng(centerArr[0]);
          setLat(centerArr[1]);
          setMarkVisible(true);
        });
        arr.push(polygonMarker);
      }
      overlayGroup = new AMap.OverlayGroup(arr);
    });
  };

  /**
   * @desc: 编辑图形
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-20 13:51:18
   * @update:
   */
  const editLine = () => {
    if (polyEditor && editFlag) {
      polyEditor.open();
      setVisible(true);
    }
    if (bezierCurveEditor && !keyFlag) {
      bezierCurveEditor.open();
    }
    if (polygonEditor && ploygonFlag) {
      polygonEditor.open();
      setVisible(true);
    }
  };

  /**
   * @desc: 结束编辑
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-20 13:53:18
   * @update:
   */
  const cancelEdit = () => {
    if (polyEditor) {
      polyEditor.close();
    }
    if (bezierCurveEditor) {
      bezierCurveEditor.close();
    }
    if (polygonEditor && ploygonFlag) {
      polygonEditor.close();
      setFinishedFlag(false);
    }
    setVisible(false);
  };

  /**
   * @desc: 显示折线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-20 20:48:33
   * @update:
   */
  const showLine = () => {
    if (polyline && polyline2) {
      polyline.show();
      polyline2.show();
      setEditFlag(true);
    }
  };

  /**
   * @desc: 隐藏折线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-21 08:40:26
   * @update:
   */
  const hideLine = () => {
    if (visible) {
      message.destroy();
      return message.error('编辑状态下无法隐藏');
    } else if (polyline && polyline2) {
      polyline.hide();
      polyline2.hide();
      setEditFlag(false);
    }
  };

  /**
   * @desc: 显示弧线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-20 20:48:33
   * @update:
   */
  const showBezierCurve = () => {
    if (bezierCurve) {
      bezierCurve.show();
    }
  };

  /**
   * @desc: 隐藏弧线
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-21 08:40:26
   * @update:
   */
  const hideBezierCurve = () => {
    if (visible) {
      message.destroy();
      return message.error('编辑状态下无法隐藏');
    } else if (bezierCurve) {
      bezierCurve.hide();
    }
  };

  /**
   * @desc: 显示多边
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-21 11:30:24
   * @update:
   */
  const showPolygon = () => {
    if (polygon) {
      polygon.show();
      setPloygonFlag(true);
    }
  };

  /**
   * @desc: 隐藏多边
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-21 08:40:26
   * @update:
   */
  const hidePolygon = () => {
    if (visible) {
      message.destroy();
      return message.error('编辑状态下无法隐藏');
    } else if (polygon) {
      polygon.hide();
      setPloygonFlag(false);
    }
  };

  /**
   * @desc: 显示点位群组
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-22 09:19:59
   * @update:
   */
  const showOverlayGroup = () => {
    if (overlayGroup) myAMap.add(overlayGroup);
  };

  /**
   * @desc: 隐藏点位群组
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-22 09:21:13
   * @update:
   */
  const hideOverlayGroup = () => {
    if (overlayGroup) myAMap.remove(overlayGroup);
  };

  /**
   * @desc: 一键显隐
   * @param {*}
   * @author: wsy
   * @Date: 2022-09-22 10:31:58
   * @update:
   */
  const keyShowAndHide = () => {
    setKeyFlag(!keyFlag);
    if (keyFlag === true) {
      showLine();
      showPolygon();
      showBezierCurve();
      showOverlayGroup();
    } else {
      hideLine();
      hidePolygon();
      hideBezierCurve();
      hideOverlayGroup();
    }
  };

  return (
    <div>
      <div id='container'></div>
      <div
        className='edit'
        // style={finishedFlag ? { height: '' } : { height: '152px' }}
      >
        <div>
          <h2>功能菜单</h2>
          <Button
            className='btn'
            onClick={showLine}
            style={{ marginLeft: '7px' }}
          >
            {'显示折线'}
          </Button>
          <Button className='btn' onClick={hideLine}>
            {'隐藏折线'}
          </Button>
          <Button className='btn' onClick={editLine}>
            {'开始编辑'}
          </Button>
          <Button
            className='btn'
            style={{ marginLeft: '7px' }}
            onClick={showPolygon}
          >
            {'显示多边'}
          </Button>
          <Button className='btn' onClick={hidePolygon}>
            {'隐藏多边'}
          </Button>
          <Button className='btn' onClick={cancelEdit}>
            {'结束编辑'}
          </Button>
          <Button
            className='btn'
            onClick={showOverlayGroup}
            hidden={finishedFlag}
            style={{ marginLeft: '7px' }}
          >
            {'显示群组'}
          </Button>
          <Button
            className='btn'
            onClick={hideOverlayGroup}
            hidden={finishedFlag}
          >
            {'隐藏群组'}
          </Button>
          <Button
            className='btn'
            style={finishedFlag ? { left: '34%' } : { left: '' }}
            onClick={keyShowAndHide}
          >
            {'一键显隐'}
          </Button>
        </div>
      </div>
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
