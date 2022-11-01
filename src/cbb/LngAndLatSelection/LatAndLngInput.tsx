/*
 * @Author: shengyushan
 * @Date: 2022-06-13 17:21:05
 * @LastEditors: shengyushan
 * @LastEditTime: 2022-06-15 10:55:41
 * @Descripttion: 经纬度框
 */
import { Row, Col, Form, Input } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { LatAndLngInputProps } from './Interface';

const FormItem = Form.Item;
const LatAndLngInput = (props: LatAndLngInputProps) => {
  const {
    value, //经纬度
    form, //form表单实例
  } = props;

  useEffect(() => {
    form.setFieldsValue({ lng: value.Lng, lat: value.Lat });
  });
  return (
    <Row>
      <Col span={12}>
        <FormItem name='lng' label={'经度'}>
          <Input disabled />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='lat' label={'纬度'}>
          <Input disabled />
        </FormItem>
      </Col>
    </Row>
  );
};

export default LatAndLngInput;
