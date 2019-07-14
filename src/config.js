import axios from 'axios'
import * as userActions from './actions/user'

const user = JSON.parse(localStorage.getItem('user'))

export const api = axios.create({
  baseURL: 'https://gentle-escarpment-19443.herokuapp.com/v1/',

  validateStatus: status => {
    if (status === 401) {
      userActions.clear()
    } else {
      return status === 200 || status === 201
    }
  },
})

if (user !== null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
  axios.defaults.headers.common['Allow-Control-Allow-Origin'] = '*'
}
