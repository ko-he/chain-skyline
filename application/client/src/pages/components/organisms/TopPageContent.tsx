import React from 'react'
import { Layout, Card, Form, Input, Checkbox, Button } from 'antd'
import styled from 'styled-components'

const TopImgWrapper = styled.div`
  width: 100%;
  height: 600px;
  padding: 100px;
  background: center center no-repeat url("top_img.jpg");
  background-size:cover;
`

const TopPageContent: React.FC<{}> = _props => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  return(
    <Layout.Content>
      <TopImgWrapper>
        <Card title="SingIn" extra="ChainSkyline" style={{ width: '400px', opacity: 0.7 }}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
          </Form>
        </Card>
      </TopImgWrapper>
    </Layout.Content>
  )
}

export default TopPageContent