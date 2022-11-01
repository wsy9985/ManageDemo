import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
  EditOutlined,
  BarsOutlined,
  ReadOutlined,
  ApartmentOutlined,
  SettingOutlined,
  LikeOutlined,
  AmazonOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import eventBus from '../../request/utils'
import "../Sider/index.css";

const items = [
  getItem("首页", "app/home", <HomeOutlined />),
  getItem("文章总览", "app/list", <ReadOutlined />),
  getItem("文章总览", "app/listT", <ReadOutlined />),
  getItem("编辑文章", "app/edit", <EditOutlined />),
  getItem("用户管理", "app/users", <UserOutlined />),
  getItem("图书管理", "app/datas", <LaptopOutlined />, [
    getItem("品类管理", "app/datas/category", <ApartmentOutlined />),
    getItem("图书一览", "app/datas/goods", <BarsOutlined />),
  ]),
  getItem("图像图表", "app/charts", <LaptopOutlined />, [
    getItem("antv/G2", "app/charts/antvg2", <ApartmentOutlined />),
    getItem("antv/G2-Bar", "app/charts/antvg2test", <ApartmentOutlined />),
    getItem("条形图Ⅰ", "app/charts/bar", <ApartmentOutlined />),
    getItem("条形图Ⅱ", "app/charts/nbar", <ApartmentOutlined />),
    getItem("折线图Ⅰ", "app/charts/line", <ApartmentOutlined />),
    getItem("折线图Ⅱ", "app/charts/nline", <ApartmentOutlined />),
    getItem("饼图Ⅰ", "app/charts/pie", <ApartmentOutlined />),
    getItem("饼图Ⅱ", "app/charts/npie", <ApartmentOutlined />),
    getItem("中国地图", "app/charts/map", <ApartmentOutlined />),
  ]),
  getItem("可视化一张图", "app/plant", <LikeOutlined />),
  getItem("高德地图", "app/amap", <AmazonOutlined />),
  getItem("高德地图Ⅱ", "app/disamap", <AmazonOutlined />),
  getItem("设置", "app/setting", <SettingOutlined />, [
    getItem("修改资料", "app/setting/modify"),
    getItem("切换账号", "app/setting/exchange"),
    getItem("范围选择", "app/setting/timepicker"),
  ]),
];

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
window.timer = null;

export default function Sider() {
    const rootSubmenuKeys = ['app/datas', 'app/setting'];
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey, setDefaultKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const [collapsed, setCollapsed] = useState(false);

  // componentDidMount
  useEffect(() => {
    let path = location.pathname;
    // 获取三级路由key值
    let key0 = path.split("/")[3];
    // 获取二级路由key值
    let key = path.split("/")[2];
    // 获取一级路由key值
    let key1 = path.split("/")[1];
    if (key && !key0) {
      // 利用正则表达式保障路径
      setDefaultKey("app/" + key.replace(/[^a-zA-Z]/g,''));
    } else if (key1 + "" === "app" && !key) {
      setDefaultKey("app/home");
    } 
    if(key0){
      setDefaultKey("app/"+key+'/'+key0);
      setOpenKeys(["app/"+key]) //......
    }
  },[location.pathname])

  useEffect(()=> {
    eventBus.on('collapsedParam', value => setCollapsed(value));
    return() => {
      eventBus.off('collapsedParam',value => setCollapsed(value));
    } 
  },[])

  const handleClick = (e) => {
    navigate("/" + e.key);
    setDefaultKey(e.key);
  };

  // 打开新的父级菜单时关闭最近的父级菜单
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="sider_set">
      <Menu
        onClick={handleClick}
        inlineCollapsed={collapsed}
        style={!collapsed?{ height: "100%", width: "200px" }:{height: "100%"}}
        selectedKeys={[defaultKey]}
        mode="inline"
        items={items}
        onOpenChange={onOpenChange}
        openKeys = {openKeys}
      />  
    </div>
  );
}
