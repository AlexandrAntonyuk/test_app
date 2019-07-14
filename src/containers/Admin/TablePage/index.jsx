import React, { Component } from 'react'
import styles from './styles.module.scss'
import * as authActions from '../../../actions/auth'
import * as userActions from '../../../actions/user'
import * as productActions from '../../../actions/products'

import { Layout, Table, Button } from 'antd'
import ModalComponent from '../../../components/ModalComponent'
import withRouter from 'react-router/es/withRouter'
import { loading } from '../../../actions/loader'
import Column from 'antd/es/table/Column'

class TablePage extends Component {
  state = {
    productList: [],
    item: {
      name: '',
      description: '',
      price: '',
      status: 10,
    },
    openModalCreate: false,
    openModalUpdate: false,
    current: 1,
    defaultPageSize: 7,
    total: 100,
  }

  async componentDidMount() {
    await this.getAllItems()
  }

  async logout() {
    try {
      loading(true)
      await authActions.logout()
      userActions.clear()
    } catch (e) {
    } finally {
      loading(false)
    }
  }

  async getAllItems() {
    try {
      loading(true)
      const res = await productActions.getAll(this.state.current, this.state.defaultPageSize)
      this.setState({ productList: res.data })
    } catch (e) {
    } finally {
      loading(false)
    }
  }

  async update(id, item) {
    try {
      loading(true)
      await productActions.update(id, item)
      await this.getAllItems()
    } catch (e) {
    } finally {
      loading(false)
    }
  }

  async addNew(item) {
    try {
      loading(true)
      await productActions.create(item)
      await this.getAllItems()
    } catch (e) {
    } finally {
      loading(false)
    }
  }

  async delete(data) {
    let item = {
      ...data,
      status: 0,
    }
    try {
      loading(true)
      await productActions.update(item.id, item)
      await this.getAllItems()
    } catch (e) {
    } finally {
      loading(false)
    }
  }

  handleCancel = () => {
    this.setState({
      openModalCreate: false,
      openModalUpdate: false,
      item: {
        name: '',
        description: '',
        price: '',
        status: 10,
      },
    })
  }

  onChangePage = page => {
    this.setState({ current: page }, () => this.getAllItems())
  }

  save = (id, item) => {
    this.state.openModalUpdate ? this.update(id, item) : this.addNew(item)
  }

  render = () => {
    const state = this.state
    return (
      <Layout className={styles.layout}>
        <Layout.Content className={styles.content}>
          <Button onClick={this.logout} className={styles.button}>
            Logout
          </Button>
          <Button onClick={() => this.setState({ openModalCreate: true })} className={styles.button}>
            Add new
          </Button>
          <ModalComponent
            openModalCreate={state.openModalCreate}
            openModalUpdate={state.openModalUpdate}
            handleCancel={this.handleCancel}
            save={(id, item) => this.save(id, item)}
            item={state.item}
          />
          <Table
            pagination={{
              current: state.current,
              defaultPageSize: state.defaultPageSize,
              total: state.total,
              onChange: page => this.onChangePage(page),
            }}
            dataSource={state.productList}
            bordered
            rowKey="name"
          >
            <Column title="Name" dataIndex="name" />
            <Column title="Description" dataIndex="description" />
            <Column title="Price" dataIndex="price" />
            <Column
              align="center"
              title="Action"
              key="action"
              render={data =>
                data.status === 0 ? (
                  <h3 style={{ color: 'red' }}>Deleted</h3>
                ) : (
                  <>
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={() => this.setState({ item: data, openModalUpdate: true })}
                    >
                      Update
                    </Button>
                    <Button onClick={() => this.delete(data)}>Delete</Button>
                  </>
                )
              }
            />
          </Table>
        </Layout.Content>
      </Layout>
    )
  }
}
export default withRouter(TablePage)
