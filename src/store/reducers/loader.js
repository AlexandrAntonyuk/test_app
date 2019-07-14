export const ACTION_TYPE = {
  SET: 'SET',
  loading: 'loading',
}

const initialState = {
  loading: false,
}

export default function loader(state = initialState, action) {
  if (action.type === ACTION_TYPE.loading) {
    return {
      ...state,
      loading: action.payload,
    }
  }
  return state
}
