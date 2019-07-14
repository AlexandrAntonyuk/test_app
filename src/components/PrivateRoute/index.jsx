import React from 'react'
import { Route, Redirect } from 'react-router'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = props => {
  let allow = false

  if (props.user && Object.keys(props.user).length === 0) {
    return <Redirect to={'/login'} />
  }

  if (props.user.hasOwnProperty('id')) allow = true

  if (!allow) message.warning(props.message ? props.message : `You have not access to this page`)

  return allow ? <Route {...props} /> : <Redirect to={props.redirectTo ? props.redirectTo : '/login'} />
}

PrivateRoute.propTypes = {
  // roles: PropTypes.arrayOf(PropTypes.number).isRequired,
  message: PropTypes.string,
  redirectTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default connect(state => ({ user: state.user }))(PrivateRoute)
