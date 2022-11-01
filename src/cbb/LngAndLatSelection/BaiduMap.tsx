/*
 * @Author: shengyushan
 * @Date: 2022-06-14 15:42:39
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-08 15:15:56
 * @Descripttion: 百度地图
 */
import { useEffect, useRef, useState } from 'react';
import { Map, Polygon } from 'react-bmap';
import { message } from 'antd';
import { MainProps } from './Interface';
// import imgPoint from './img/point.png';
import React from 'react';

let geoc: any = null; //地址解析对象全局变量
let marker: any = null; //点全局变量
const BaiduMap = (props: MainProps) => {
  const {
    lng, //经度
    lat, //纬度
    area, //区域，包括省市区
    handleError, //错误事件
    handleLngAndLatChanged, //地图点击事件
    form, //form表单实例
  } = props;
  const mapRef = useRef<any>(null); //存储地图实例
  const [polygonArr, setPolygonArr] = useState([]); //多边形覆盖物点数组
  const polygonRef = useRef<any>(null); //存储多边形覆盖物

  useEffect(() => {
    const { map } = mapRef.current;

    area && drawBoundary(area);
    map.addEventListener('click', handleClickMap);
    geoc = new (window as any).BMap.Geocoder(); // 地址解析对象
    if (lng && lat) {
      const newPoint = new (window as any).BMap.Point(lng, lat);
      if (!marker) {
        marker = new (window as any).BMap.Marker(newPoint); // 创建标注
        setMarkerIcon(marker);
        map.addOverlay(marker);
      }
      getAddress(newPoint);
    }
    return () => {
      marker = null;
      map.removeEventListener('click', handleClickMap);
    };
  }, []);

  /**
   * @Author: shengyushan
   * @descripttion: 根据经纬度获取地址
   * @param {any} point
   * @return {*}
   */
  const getAddress = (point: any, flag?: string) => {
    geoc.getLocation(point, (rs: any) => {
      const addComp = rs.addressComponents;
      const address =
        addComp.province +
        addComp.city +
        addComp.district +
        addComp.street +
        addComp.streetNumber;
      if (flag) {
        if (
          !area ||
          area.indexOf(addComp.district) >= 0 ||
          polygonRef.current.length === 0
        ) {
          const { map } = mapRef.current;
          map.removeOverlay(marker);
          const newPoint = new (window as any).BMap.Point(point.lng, point.lat);
          marker = new (window as any).BMap.Marker(newPoint); // 创建标注
          setMarkerIcon(marker);
          map.addOverlay(marker);
          form?.setFieldsValue({
            Address: address,
            LngAndLat: { Lng: point.lng, Lat: point.lat },
          });
          notifyLngAndLatChanged(point.lng, point.lat, address);
        } else {
          message.error('选择的点超过所选区域');
          if (handleError) handleError(true);
        }
      } else {
        form?.setFieldsValue({ Address: address });
      }
    });
  };

  /**
   * @Author: shengyushan
   * @descripttion: 行政区覆盖物
   * @param {行政区名称} name
   */
  const drawBoundary = (name: string) => {
    if (!name) return;
    const bdary = new (window as any).BMap.Boundary();
    bdary.get(name, (rs: any) => {
      const count = rs.boundaries.length;
      if (count === 0) {
        polygonRef.current = [];
        return;
      }
      let strs = new Array(null);
      strs = rs.boundaries[0].split(';');
      let arr: any = [];
      strs.map((ele: any) => {
        arr.push({
          lng: parseFloat(ele.split(',')[0]),
          lat: parseFloat(ele.split(',')[1]),
        });
      });
      polygonRef.current = arr;
      setPolygonArr(arr);
    });
  };

  /**
   * @Author: shengyushan
   * @descripttion: 地图点击事件
   * @param {点击对象} e
   */
  const handleClickMap = (e: any) => {
    getAddress(e.point, 'click');
  };

  const setMarkerIcon = (ev: any) => {
    let icon = new (window as any).BMap.Icon(
      './img/point.png',
      new (window as any).BMap.Size(19, 33),
      {
        anchor: new (window as any).BMap.Size(6, 16),
      }
    );
    ev.setIcon(icon);
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

  /**
   * @Author: shengyushan
   * @descripttion: 创建地图实例
   * @param {地图实例} map
   */
  const createMapRef = (map: any) => {
    if (map) {
      mapRef.current = map;
    }
  };
  const centerName = area || '合肥市';
  return (
    <Map
      center={
        polygonArr.length > 0
          ? centerName
          : centerName.substring(0, centerName.lastIndexOf('市') + 1)
      }
      zoom={13}
      enableScrollWheelZoom='true'
      ref={createMapRef}
    >
      <Polygon
        fillColor='#80d8ff'
        fillOpacity='0.4'
        strokeOpacity='0.65'
        strokeColor='#0091ea'
        strokeWeight='1'
        path={polygonArr}
      />
    </Map>
  );
};

export default BaiduMap;
