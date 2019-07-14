import React from 'react'
import { Button, Form, Modal, Input, InputNumber } from 'antd'
import styles from './styles.module.scss'
import withRouter from 'react-router/es/withRouter'
import NumberFormat from 'react-number-format'

class ModalComponent extends React.Component {
  handleSubmit = e => {
    const props = this.props
    const item = this.props.item
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const valid =
          values.price === item.price && values.description === item.description && values.name === item.name
        if (!valid) {
          props.save(item.id, values)
          this.handleCancelModal()
        }
      }
    })
  }

  handleCancelModal = () => {
    this.props.handleCancel()
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { openModalCreate, openModalUpdate, item } = this.props

    return (
      <Modal
        width={700}
        title={openModalCreate ? 'Add new' : 'Update'}
        visible={openModalCreate || openModalUpdate}
        onCancel={this.handleCancelModal}
        footer={false}
        className={styles.modal}
      >
        <Form className={styles.form} onSubmit={this.handleSubmit}>
          <Form.Item className={styles.input}>
            <h3>Name:</h3>
            {getFieldDecorator('name', {
              initialValue: item.name || '',
              rules: [{ required: true, message: '\n' + 'Please enter the name of the product!' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item className={styles.input}>
            <h3>Description:</h3>
            {getFieldDecorator('description', {
              initialValue: item.description || '',
              rules: [{ required: true, message: '\n' + 'Please enter the description of the product!' }],
            })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
          </Form.Item>

          <Form.Item className={styles.input}>
            <h3>Price:</h3>
            {getFieldDecorator('price', {
              initialValue: item.price || '',
              rules: [{ required: true, message: '\n' + 'Please enter the price of the product!' }],
            })(<NumberFormat className={styles.inputNumberFormat} />)}
          </Form.Item>

          <div>
            <Button className={styles.button} key="back" onClick={this.handleCancelModal}>
              Cancel
            </Button>
            <Button className={styles.button} key="submit" htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
const WrappedLoginForm = Form.create({ name: 'product' })(ModalComponent)

export default withRouter(WrappedLoginForm)
