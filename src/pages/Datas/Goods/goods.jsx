import {  
  Button, 
  List, 
  Skeleton, 
  Modal,
  message ,
  Form,
  Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import http from '../../../request/http';
export default function Goods() {
  const [form] = Form.useForm();
  const confirm = Modal.confirm;
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) =>{
      add(values);
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function render() {
    let res = await http({
      method:'get',
      url:'http://ajax-base-api-t.itheima.net/api/getbooks'
    });
    setList(res.data)
  }

  async function del(id) {
    let res = await http({
      method:'delete',
      url:'http://ajax-base-api-t.itheima.net/api/delbook',
      params:{
        id:id
      }
    });
    if(res.status === 503){
      message.error('暂无权限')
    }
    render(current);
  }

  async function add(data) {
    let res = await http({
      method:'post',
      url:'http://ajax-base-api-t.itheima.net/api/addbook',
      data
    });
    console.log(res.status);
    if(res.status === 201){
      setIsModalVisible(false);
    }else if(res.status === 502){
      setIsModalVisible(true);
      message.warn('作品已存在')
    }
    render(current);
  }


  // 请求列表数据
  useEffect(()=>{
    render(current);
  },[])

  const delFn =(id)=>{
    confirm({
      title: "注意!",
      content: "此操作将永久删除数据,是否继续？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        if(!sessionStorage.token){
          message.error('游客权限未开启')
        }else{
          del(id);
          message.success('删除成功')
        }
      },
      onCancel:()=>{}
    });
  }

  return (
    <div className='List_table'>
       <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={showModal}
              >
                添加
              </Button>,
              <Button type="danger" onClick={() => delFn(item.id)}>
                删除
              </Button>,
            ]}
          >
            <Skeleton loading={false} >
              <List.Item.Meta
                title={<a href="!#">{item.id}</a>}
              />
              <List.Item.Meta
                title={<a href="!#">{item.bookname}</a>}
              />
              <List.Item.Meta
                title={<a href="!#">{item.author}</a>}
              />
              <List.Item.Meta
                title={<a href="!#">{item.publisher}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
        />
        <Modal
          title="添加书籍" 
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="提交" 
          cancelText="取消"
        >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4}}
          wrapperCol={{ span: 20}}
          autoComplete="off"
          // initialValues={{title,subTitle}}
        >
          <Form.Item
            label="书名"
            name="bookname"
            rules={[{ required: true,message: "请填写标题"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="作者" 
            name="author" 
            rules={[{ required: true,message: "请填写作者"}]}>
            <Input />
          </Form.Item>

          <Form.Item 
            label="出版社" 
            name="publisher"
            rules={[{ required: true,message: "请填写出版社"}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
        
    </div>
    
  )
}
