import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import PrivateRoute from '../../components/PrivateRoute'
import Login from '../Public/Login'

import TablePage from '../Admin/TablePage'
import withRouter from 'react-router/es/withRouter'
import connect from 'react-redux/es/connect/connect'

import { ClipLoader } from 'react-spinners'
import styles from './styles.module.scss'

class App extends Component {
  render = () => {
    return (
      <Route>
        <div className={styles.layout}>
          {this.props.loading && (
            <div className={styles.spinner}>
              <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={true} />
            </div>
          )}
          <Switch>
            <PrivateRoute path="/table" component={TablePage} />

            <Route path="/login" component={Login} />

            <Redirect from="/" to="/login" />
            {/*<Route component={NotFound}/>*/}
          </Switch>
        </div>
      </Route>
    )
  }
}
export default withRouter(connect(state => ({ user: state.user, loading: state.loader.loading }))(App))
