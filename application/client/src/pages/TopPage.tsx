import React from 'react'
import { Layout } from 'antd'
import MainHader from './components/organisms/MainHaeder'

const TopPage: React.FC<{}> = _props => {
  return (
    <Layout>
      <MainHader />
      <Layout.Content>
        <Layout className="site-layout-background">
          <Layout.Content style={{ minHeight: 280 }}>Content</Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default TopPage