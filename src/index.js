import './config'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

// normalize and basic styles for application
import 'normalize.css'
import 'antd/dist/antd.css'
import './sources/styles/styles.scss'
import Provider from 'react-redux/es/components/Provider'
import store from './store'
import { Router } from 'react-router'
import history from './utils/history'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
