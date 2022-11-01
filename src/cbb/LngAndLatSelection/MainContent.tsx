/*
 * @Author: shengyushan
 * @Date: 2022-06-14 15:34:37
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-08 15:11:29
 * @Descripttion: 经纬度选择CBB模态框内容
 */
import { Input, Form, Row, Col } from 'antd';
import LatAndLngInput from './LatAndLngInput';
import BaiduMap from './BaiduMap';
import GaoDeMap from './GaoDeMap';
import { MainProps } from './Interface';
import React from 'react';

const FormItem = Form.Item;
const MainContent = (props: MainProps) => {
  const {
    mapType, //地图类型
    lng, //经度
    lat, //纬度
    area, //区域，包括省市区
    handleError, //错误事件
    handleLngAndLatChanged, //地图点击事件
  } = props;
  const [form] = Form.useForm();

  let mapInit: any;
  if (mapType === 'gaode') {
    mapInit = (
      <GaoDeMap
        lng={lng}
        lat={lat}
        area={area}
        handleLngAndLatChanged={handleLngAndLatChanged}
        handleError={handleError}
        form={form}
      />
    );
  } else {
    mapInit = (
      <BaiduMap
        lng={lng}
        lat={lat}
        area={area}
        handleLngAndLatChanged={handleLngAndLatChanged}
        handleError={handleError}
        form={form}
      />
    );
  }
  return (
    <div className='stationMap'>
      {mapInit}
      <br />
      <Row>
        <Form layout='inline' form={form}>
          <Col span={8}>
            <FormItem
              shouldUpdate
              name='Address'
              label={'参考地址'}
              initialValue={area}
            >
              {<Input style={{ minWidth: 250 / 192 + 'rem' }} disabled />}
            </FormItem>
          </Col>
          <Col span={14} offset={2}>
            <FormItem
              shouldUpdate
              name='LngAndLat'
              initialValue={{ Lng: lng, Lat: lat }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {<LatAndLngInput value={{ Lng: lng, Lat: lat }} form={form} />}
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row style={{ color: 'red', fontSize: '0.05rem', marginTop: '0.05rem' }}>
        {'请通过点击地图区域确定经纬度'}
      </Row>
    </div>
  );
};

export default MainContent;
