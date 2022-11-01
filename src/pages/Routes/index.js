/*
 * @Author: wusiyuan
 * @Date: 2022-07-07 11:06:45
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-31 21:24:28
 * @Description:
 */
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
/* 单页面 */
import App from '../../App';
import Home from '../Home';
import List from '../List/List';
import ListT from '../List/List2';
import Edit from '../Edit/Edit';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Users from '../Users/users';
/* 图书管理 */
import Category from '../Datas/Category/category';
import Goods from '../Datas/Goods/goods';
/* 图形图表 */
import Bar from '../Charts/bar';
import Nbar from '../Charts/nbar';
import Line from '../Charts/line';
import Nline from '../Charts/nline';
import Pie from '../Charts/pie';
import Npie from '../Charts/npie';
import PlantLine from '../Charts';
import Emap from '../Charts/map';
import AntvG2 from '../Charts/antvg2';
import AntvG2T from '../Charts/antvg2test';
/* 高德地图 */
import Amap from '../Amap';
import Amap2 from '../DisAmap';
/* 设置 */
import Exchange from '../../pages/Setting/Exchange/exchange';
import Modify from '../../pages/Setting/Modify/modify';
import TimePicker from '../../pages/Setting/TimePicker';

export default function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/app' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='/app/home' element={<Home />} />
        <Route path='/app/list' element={<List />} />
        <Route path='/app/listT' element={<ListT />} />
        <Route path='/app/edit' element={<Edit />} />
        <Route path='/app/edit:id' element={<Edit />} />
        <Route path='/app/users' element={<Users />} />

        <Route path='/app/datas'>
          <Route path='' element={<Category />} />
          <Route path='/app/datas/category' element={<Category />} />
          <Route path='/app/datas/goods' element={<Goods />} />
          <Route path='*' element={<Navigate to='category' />} />
        </Route>
        <Route path='/app/charts'>
          <Route path='/app/charts/bar' element={<Bar />} />
          <Route path='/app/charts/antvg2' element={<AntvG2 />} />
          <Route path='/app/charts/antvg2test' element={<AntvG2T />} />
          <Route path='/app/charts/nbar' element={<Nbar />} />
          <Route path='/app/charts/line' element={<Line />} />
          <Route path='/app/charts/nline' element={<Nline />} />
          <Route path='/app/charts/pie' element={<Pie />} />
          <Route path='/app/charts/npie' element={<Npie />} />
          <Route path='/app/charts/map' element={<Emap />} />
          <Route path='*' element={<Navigate to='bar' />} />
        </Route>
        <Route path='/app/amap' element={<Amap />}></Route>
        <Route path='/app/disamap' element={<Amap2 />}></Route>
        <Route path='/app/plant' element={<PlantLine />} />
        <Route path='/app/setting'>
          <Route path='' element={<Modify />} />
          <Route path='/app/setting/modify' element={<Modify />} />
          <Route path='/app/setting/exchange' element={<Exchange />} />
          <Route path='/app/setting/timepicker' element={<TimePicker />} />
          <Route path='*' element={<Navigate to='modify' />} />
        </Route>
      </Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='*' element={<Navigate to='login' />}></Route>
    </Routes>
  );
}

/* export default [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "list", element: <List /> },
      { path: "listT", element: <ListT /> },
      { path: "edit", element: <Edit /> },
      { path: "edit:id", element: <Edit /> },
      { path: "users", element: <Users /> },
      {
        path: "/app/datas",
        children: [
          { path: "", element: <Category /> },
          { path: "category", element: <Category /> },
          { path: "goods", element: <Goods /> },
        ],
      },
      {
        path: "/app/setting",
        children: [
          { path: "", element: <Category /> },
          { path: "modify", element: <Modify /> },
          { path: "exchange", element: <Exchange /> },
        ],
      },
    ],
  },
  { path: "/register", element: <Register /> },
]; */
