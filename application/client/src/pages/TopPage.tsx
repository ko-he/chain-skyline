import React from 'react'
import { Layout } from 'antd'
import MainHader from '../components/organisms/MainHaeder'
import TopPageContent from '../components/organisms/TopPageContent'

const TopPage: React.FC<{}> = _props => {
  return (
    <Layout>
      <MainHader />
      <Layout.Content>
        <Layout className="site-layout-background">
          <TopPageContent />
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default TopPage