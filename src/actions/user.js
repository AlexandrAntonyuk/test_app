import store from '../store/index'

import { USER } from '../store/reducers/user'

export function set(data) {
  store.dispatch({
    type: USER.USER_SET,
    payload: data,
  })
}

export function clear() {
  localStorage.removeItem('user')

  store.dispatch({
    type: USER.USER_CLEAR,
  })
}
