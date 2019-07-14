import store from '../store/index'
import { ACTION_TYPE } from '../store/reducers/loader'

export function loading(enable) {
  store.dispatch({
    type: ACTION_TYPE.loading,
    payload: enable,
  })
}
