/*
 * @Author: shengyushan
 * @Date: 2022-06-13 11:47:05
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-08 15:11:04
 * @Descripttion: 经纬度选择CBB
 */
import { Button, Modal, Tooltip, message } from 'antd';
import { useState } from 'react';
import MainContent from './MainContent';
import { EnvironmentOutlined } from '@ant-design/icons';
import { IndexProps } from './Interface';
import React from 'react';

const LngAndLatSelection = (props: IndexProps) => {
  const {
    mapType = 'baidu', //地图类型
    area, //区域，包括省市区
    existArea = true, //是否需要选择区域，默认需要
    errorMsg, //未选择区域的错误提示
    longitudelatitude, //经纬度，以逗号隔开
    formDisabled, //地图选点是否可点击
    handleMapOk, //选择经纬度模态窗确定事件
    className, //模态框样式
  } = props;
  const [lng, setLng] = useState(''); //经度
  const [lat, setLat] = useState(''); //纬度
  const [mapVisible, setMapVisible] = useState(false); //模态窗显隐
  const [castArea, setCastArea] = useState(''); //模态窗参考地址
  const [isError, setIsError] = useState(false); //是否错误

  /**
   * @Author: shengyushan
   * @descripttion: 地图选点点击事件
   * @return {错误信息}
   */
  const handleMapVisible = () => {
    if (existArea && !area) {
      return message.error(errorMsg || '请选择区域');
    } else {
      const lnglat = longitudelatitude();
      setLng(lnglat ? lnglat.split(',')[0] : '');
      setLat(lnglat ? lnglat.split(',')[1] : '');
      setMapVisible(true);
    }
  };

  /**
   * @Author: shengyushan
   * @descripttion: 选择经纬度模态框确定事件
   */
  const handleOk = () => {
    if (handleMapOk) {
      handleMapOk(lng, lat, castArea);
    }
    setMapVisible(false);
  };

  /**
   * @Author: shengyushan
   * @descripttion: 地图点击事件
   * @param {经度} castlng
   * @param {纬度} castlat
   * @param {地址} castarea
   */
  const handleLngAndLatChanged = (
    castlng: any,
    castlat: any,
    castarea: string
  ) => {
    setLng(`${castlng}`);
    setLat(`${castlat}`);
    setIsError(false);
    setCastArea(castarea);
  };

  return (
    <div>
      <Tooltip title={'地图选点'}>
        <Button
          size='small'
          icon={<EnvironmentOutlined />}
          type='primary'
          onClick={handleMapVisible}
          style={{ marginTop: '0.17rem', marginLeft: '0.05rem' }}
          disabled={formDisabled}
        />
      </Tooltip>
      {mapVisible && (window as any).BMap && (
        <Modal
          title={'选择经纬度'}
          maskClosable={false}
          destroyOnClose
          width={900 / 192 + 'rem'}
          visible={mapVisible}
          onOk={handleOk}
          onCancel={() => setMapVisible(false)}
          okButtonProps={{ disabled: isError }}
          className={className || ''}
        >
          {(window as any).BMap ? (
            <MainContent
              mapType={mapType}
              lng={lng}
              lat={lat}
              area={area}
              handleLngAndLatChanged={handleLngAndLatChanged}
              handleError={(error: boolean) => setIsError(error)}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default LngAndLatSelection;
