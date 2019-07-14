export const USER = {
  USER_SET: 'USER_SET',
  USER_CLEAR: 'USER_CLEAR',
}

const userInfo = JSON.parse(localStorage.getItem('user'))
const initState = userInfo !== null ? userInfo : {}

export default function user(state = initState, action) {
  switch (action.type) {
    case USER.USER_SET:
      return { ...action.payload }
    case USER.USER_CLEAR:
      return {}
    default:
      return state
  }
}
