import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const TopImgWrapper = styled.div`
  width: 100%;
  height: 600px;
  background: center center no-repeat url("top_img.jpg");
  background-size:cover;
`

const TopPageContent: React.FC<{}> = _props => {
  return(
    <Layout.Content>
      <TopImgWrapper />
    </Layout.Content>
  )
}

export default TopPageContent