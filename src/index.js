/*
 * @Author: wusiyuan
 * @Date: 2022-06-30 10:27:52
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-21 11:36:56
 * @Description:
 */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './comcss/base.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router />
  </>
);
