import { Form, Icon, Input, Button, Checkbox } from 'antd'
import React from 'react'

import styles from './styles.module.scss'
import * as authActions from '../../../actions/auth'
import * as userActions from '../../../actions/user'
import withRouter from 'react-router/es/withRouter'
import { loading } from '../../../actions/loader'

import { openNotificationWithIcon } from '../../../constants'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    let user = localStorage.getItem('user')
    console.log(user)
    if (user && JSON.parse(user).hasOwnProperty('id')) this.props.history.push('/table')
  }

  async loginUser(cred) {
    try {
      loading(true)

      await authActions.singIn(cred)

      this.props.history.push('/table')
    } catch (e) {
      openNotificationWithIcon('error', 'Не удалось авторизоватся!', 'Проверте email или пароль')
    } finally {
      loading(false)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.loginUser({ email: values.email, password: values.password })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props)
    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <div className={styles.checkBox}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a>Forgot password</a>
              </div>
              <Button type="primary" htmlType="submit" className={styles.button}>
                Sign in
              </Button>
              or <a href="/register">Sign up</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const WrappedLoginForm = Form.create({ name: 'login' })(Login)

export default withRouter(WrappedLoginForm)
