/*
 * @Author: wusiyuan
 * @Date: 2022-06-30 15:02:00
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-13 11:19:56
 * @Description:
 */
/* 
    App > List + Edit + Datas
    Login
    Register
*/

import { BrowserRouter } from 'react-router-dom';
import MyRoutes from '../pages/Routes';

function BasicRouter() {
  return (
    <BrowserRouter>
      <MyRoutes />
      {/* {MyRoutes} */}
    </BrowserRouter>
  );
}

export default BasicRouter;
