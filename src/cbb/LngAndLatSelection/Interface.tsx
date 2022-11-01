/*
 * @Author: shengyushan
 * @Date: 2022-06-15 10:43:02
 * @LastEditors: shengyushan
 * @LastEditTime: 2022-08-02 14:59:33
 * @Descripttion: 定义传入参数类型
 */
import { FormInstance } from 'antd/lib/form';
export interface MainProps {
  lng: number | string;
  lat: number | string;
  area?: string;
  handleError: (error: boolean) => void;
  handleLngAndLatChanged: (lng: number | string, lat: number | string, area: string) => void;
  form?: FormInstance;
  mapType?: 'baidu' | 'gaode';
}

export interface IndexProps {
  mapType?: 'baidu' | 'gaode';
  area?: string;
  existArea?: boolean;
  errorMsg?: string;
  longitudelatitude: () => string;
  formDisabled: boolean;
  handleMapOk: (lng: number | string, lat: number | string, area: string) => void;
  className?: string;
}

export interface LatAndLngInputProps {
  value: { Lng: number | string; Lat: number | string };
  form: FormInstance;
}
