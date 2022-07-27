import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export function Guide() {
  const navigate = useNavigate();

  return (
    <div>
      <Button type='link' onClick={() => { navigate('/') }}>返回计算器</Button>
      <div>Guide</div>
    </div>
  )
}