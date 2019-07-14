import axios from 'axios'
import { api } from '../config'

import * as userActions from './user'

export async function singIn(data) {
  let res = await api.post('users/auth', data)
  if (res.status !== 200) throw new Error(`Can't fetch request`)

  localStorage.setItem('user', JSON.stringify(res.data))
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
  userActions.set(res.data)
  return res
}

export async function logout() {
  let res = await api.post('users/logout')
  if (res.status !== 200) throw new Error(`Can't fetch request`)

  return res
}
