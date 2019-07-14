import React from 'react'
import styles from './styles.module.scss'

const AppLoading = props => (
  <div className={styles.loading}>
    <span>{props.title}, please wait...</span>
  </div>
)

export default AppLoading
