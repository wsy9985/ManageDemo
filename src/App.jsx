import React from 'react'
import { Button } from 'antd';
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>App12321321321321
      <Button type="primary">Primary Button</Button>
      <Outlet />
    </div>
  )
}
