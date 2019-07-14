import { Layout } from 'antd'
import React, { Component } from 'react'

import styles from './styles.module.scss'

const NotFound = props => (
  <Layout className={styles.layout}>
    <Layout.Content className={styles.content}>
      <h1>{props.title}</h1>
    </Layout.Content>
  </Layout>
)

export default NotFound
