import React from 'react'
import { Layout, Card, Form, Input, Checkbox, Button } from 'antd'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const TopImgWrapper = styled.div`
  width: 100%;
  height: 600px;
  padding: 100px;
  background: center center no-repeat url("top_img.jpg");
  background-size:cover;
`
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const TopPageContent: React.FC<{}> = _props => {
  const [formType, setFormType] = React.useState<string>('SingIn')
  return(
    <Layout.Content>
      <TopImgWrapper>
        <Card title={formType}
          actions={[
            <SettingOutlined key="setting" onClick={() => setFormType('SingIn')} />,
            <EditOutlined key="edit" onClick={() => setFormType('SingUp')} />
          ]}
          extra="ChainSkyline"
          style={{ width: '400px', opacity: 0.85 }}
        >
          {
            formType === 'SingIn'
              ? <Form
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
              : <Form
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
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
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
          }
        </Card>
      </TopImgWrapper>
    </Layout.Content>
  )
}

export default TopPageContent