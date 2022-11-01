import React, {useState, useEffect } from 'react'
import  {SearchOutlined, DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { Dropdown, Menu, Modal,Space ,Input, message} from 'antd';
import {useNavigate} from 'react-router-dom'
import './index.css'
import defaultAvatar from '../../img/4.webp'
import logo from '../../img/2.png'




export default function() {
  let timer = null
  const navigate = useNavigate();
  const {confirm} = Modal
  const onSearch = (value) => console.log(value);
  const [avatar,setAvatar] = useState(defaultAvatar);
  const [username,setUsername] = useState('游客');


  /* componentWillUnmount() {
    clearInterval(this.interval);
  }
 */
  useEffect(()=>{
    let username1 = localStorage.getItem('username')
    let avatar1 = localStorage.getItem('avatar')
    setUsername(username1 || username);
    if(avatar1){
      setAvatar('http://47.93.114.103:6688/'+avatar1)
    }
  })

  const logOut = () =>{
    confirm({
      title:'确认退出吗？',
      icon:<ExclamationCircleOutlined />,
      content:'点击确定重新登录',
      okText:'确定',
      cancelText:'取消',
      onOk(){
        message.success('退出成功,即将返回登录页')
        localStorage.clear();  // 清除登录保存缓存
        sessionStorage.clear() // 清除会话存储
        setTimeout(()=> navigate('/login'),1500)
      },
      onCancel(){}
    })
  }

  const dataOut = () =>{
    setTimeout(()=> navigate('/app/setting/modify'),500)
  }

  const showImg = () =>{
    localStorage.getItem('avatar')
  }

  const go = () =>{
    clearInterval(timer);
    timer = setTimeout(()=>{
      alert('hello')
    },1500)
  }

  const items = [
    {key: '1',label: (<span onClick={dataOut} style={{textAlign:'center',display:'block'}}>修改资料</span>),},
    {key: '2',label: (<hr style={{color:'white',fontSize:'10px',margin:'0 ', padding:'0',width:'100%'}}/>),},
    {key: '3', label: (<span onClick={logOut} style={{textAlign:'center',display:'block'}}>退出登录</span>),},
  ]

  const menu = (
    <Menu items={items}>   
    </Menu>
  );

  
  return (
    <div className='header'>
      <div className='left-header'>
          <a >
              <img className='icon' src={logo}  />
              <h1>Ant Design Pro</h1>
          </a>
      </div> 

      <div className='right-header'>
          <div className='search-items'>
              <a  onClick={go} target="_blank">
                <SearchOutlined />
              </a>
              
              <span className='shrink'>
                  <Input style={{width:0,display:'none'}}
                    placeholder="周杰伦专辑" 
                    
                  />
              </span>
              
          </div>

          {/* 右侧其他框 */}
          <div className='space-item'>
            <Dropdown overlay={menu}>
            <a className='ant-dropdown-link'  onClick={e => e.preventDefault()}>
              <Space>
                <img src={avatar} onClick={showImg} className="right_avator" />
                <span>{username}</span>
              <DownOutlined />
              </Space>
              </a>
            </Dropdown>
          </div>            
      </div>
    </div>
  )
}
