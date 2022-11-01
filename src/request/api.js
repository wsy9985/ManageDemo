/*
 * @Author: wusiyuan
 * @Date: 2022-06-30 17:14:05
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-07-28 08:32:18
 * @Description:
 */
import request from './request';
import requestW from './requestWeather';

// 注册
export const RegisterApi = (params) => request.post('/register', params);

// 登录
export const LoginApi = (params) => request.post('/login', params);

// 获取文章列表
export const ArticleListApi = (params) => request.get('/article', { params });

// 添加文章
export const ArticleAddApi = (params) => request.post('/article/add', params);

// 查看文章
export const ArticleSearchApi = (params) =>
  request.get(`/article/${params.id}`);

// 更新文章
export const ArticleUpdateApi = (params) =>
  request.put('/article/update', params);

// 删除文章
export const ArticleDelApi = (params) =>
  request.post('/article/remove', params);

// 获取用户资料
export const GetUsersDataApi = () => request.get('/info');

// 修改用户资料
export const ChangeUsersDataApi = (params) => request.put('/info', params);

export const reqWeather = (data) =>
  requestW('https://restapi.amap.com/v3/weather/weatherInfo', data);

//获取IP地址
export const reqIP = (data) => requestW('https://restapi.amap.com/v3/ip', data);
/* 
    axios.get({
        params:{
            num:1
        }
    })

    axios.post({
        num:1
    })
*/
