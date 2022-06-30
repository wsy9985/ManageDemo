/* 
    App > List + Edit + Datas
    Login
    Register
*/

import App from '../App'
import List from '../pages/List/List'
import Edit from '../pages/Edit/Edit'
import Login from '../pages/Login/Login'
import Datas from '../pages/Datas/Datas'
import Register from '../pages/Register/Register'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

const BasicRouter = () =>(
    <BrowserRouter>
        <Routes>
            <Route path='' element={<App/>}>
                <Route path='/list' element={<List/>}/>
                <Route path='/edit' element={<Edit/>}/>
                <Route path='/datas' element={<Datas/>}/>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </BrowserRouter>
)

export default BasicRouter