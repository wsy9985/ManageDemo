/*
 * @Author: shengyushan
 * @Date: 2022-06-15 15:10:01
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-08 15:10:00
 * @Descripttion:
 */
import { useEffect } from 'react';
import { MainProps } from './Interface';
import { message } from 'antd';
import React from 'react';
let map: any = null; //地图全局变量
let marker: any = null; //点全局变量
let polygon: any = null; //行政区图层全局变量
let geocoder: any = null; //地址解析全局变量
const GaoDeMao = (props: MainProps) => {
  const {
    lng, //经度
    lat, //纬度
    area, //区域，包括省市区
    handleError, //错误事件
    handleLngAndLatChanged, //地图点击事件
    form, //form表单实例
  } = props;

  /**
   * @Author: shengyushan
   * @descripttion: 创建地图
   */
  const createMap = async () => {
    //基本地图加载
    map = new (window as any).AMap.Map('lnglatselect-amap', {
      resizeEnable: true,
      //center: area, //地图中心点
      zoom: 4, //地图显示的缩放级别
    });
    map.on('click', showInfoClick);
    geocoder = new (window as any).AMap.Geocoder({
      //city: "010", //城市设为北京，默认：“全国”
      radius: 1000, //范围，默认：500
    });
    area && drawBoundary(area);
    if (lng && lat) {
      if (!marker) {
        marker = new (window as any).AMap.Marker({ position: [lng, lat] }); // 创建标注
        map.add(marker);
      }
      let address = await regeoCode(`${lng},${lat}`);
      form?.setFieldsValue({
        Address: address,
      });
    }
  };

  /**
   * @Author: shengyushan
   * @descripttion: 行政区覆盖物
   * @param {行政区名称} area
   */
  const drawBoundary = (area: string) => {
    const district = new (window as any).AMap.DistrictSearch({
      subdistrict: 0, //获取边界不需要返回下级行政区
      extensions: 'all', //返回行政区边界坐标组等具体信息
      level: 'district', //查询行政级别为 市
    });
    district.search(
      area.substring(area.indexOf('市') + 1),
      function (status: any, result: any) {
        const polygons: any = [];
        const bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            polygon = new (window as any).AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: '#80d8ff',
              strokeColor: '#0091ea',
            });
            polygons.push(polygon);
          }
        }
        polygon.on('click', polygonClick);
        map.add(polygons);
        map.setFitView(polygons); //视口自适应
      }
    );
  };

  /**
   * @Author: shengyushan
   * @descripttion: 地图点击事件
   * @param {点击实例} ev
   */
  const showInfoClick = (ev: any) => {
    if (polygon) {
      message.error('选择的点超过所选区域');
      if (handleError) handleError(true);
    } else {
      polygonClick(ev);
    }
  };

  /**
   * @Author: shengyushan
   * @descripttion: 图层点击事件
   * @param {点击实例} ev
   */
  const polygonClick = async (ev: any) => {
    marker && map.remove(marker);
    marker = new (window as any).AMap.Marker({
      position: [ev.lnglat.lng, ev.lnglat.lat],
    }); // 创建标注
    map.add(marker);
    let address = await regeoCode(`${ev.lnglat.lng},${ev.lnglat.lat}`);
    form?.setFieldsValue({
      Address: address,
      LngAndLat: { Lng: ev.lnglat.lng, Lat: ev.lnglat.lat },
    });
    notifyLngAndLatChanged(ev.lnglat.lng, ev.lnglat.lat, address);
  };

  /**
   * @Author: shengyushan
   * @descripttion: 根据经纬度查询地址
   * @param {经纬度} lnglat
   * @return {地址}
   */
  const regeoCode = (lnglat: string): any => {
    return new Promise((resolve, reject) => {
      geocoder.getAddress(lnglat, function (status: any, result: any) {
        if (status === 'complete' && result.regeocode) {
          let address = result.regeocode.formattedAddress;
          resolve(address);
        } else {
          resolve('');
          message.error('根据经纬度查询地址失败');
        }
      });
    });
  };

  /**
   * @Author: shengyushan
   * @descripttion: 地图点击事件，将经纬度和地址传递到父级
   * @param {经度} lng
   * @param {纬度} lat
   * @param {地址} address
   */
  const notifyLngAndLatChanged = (lng: any, lat: any, address: string = '') => {
    handleLngAndLatChanged(lng, lat, address);
  };

  useEffect(() => {
    createMap();
    return () => {
      map.off('click', showInfoClick);
      map && map.destroy();
      map = null;
      polygon && polygon.off('click', polygonClick);
      polygon = null;
      marker = null;
    };
  }, []);
  return (
    <div id='lnglatselect-amap' style={{ width: '100%', height: 350 }}></div>
  );
};

export default GaoDeMao;
