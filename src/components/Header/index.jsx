import React from 'react'
import { Layout, Button, Input } from 'antd'
import { connect } from 'react-redux'

import styles from './styles.module.scss'

function Header(props) {
  const { title, search, placeholder, value } = props

  return (
    <Layout.Header style={{ background: '#dee1e5' }}>
      <div className={styles.header}>
        <h1>{title} </h1>

        <Input
          placeholder={placeholder}
          className={styles.search}
          onChange={e => {
            search(e.target.value)
          }}
          value={value}
        />
      </div>
    </Layout.Header>
  )
}

export default connect(state => ({ user: state.user }))(Header)
