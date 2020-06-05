import { createStore, Reducer, AnyAction } from 'redux'

const reducer: Reducer<any, AnyAction> = (state = {}, action) => {
  return state
}

const store = createStore(reducer)

export default store