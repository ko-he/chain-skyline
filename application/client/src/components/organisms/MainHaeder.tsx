
import React from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'

const HeaderLogo = styled.div`
  width: 200px;
  color: rgba(255, 255, 255, 0.85);
`

const MainHader: React.FC<{}> = _props => {
  return (
    <Layout.Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <HeaderLogo>ChainSkeyline</HeaderLogo>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Layout.Header>
  )
}

export default MainHader