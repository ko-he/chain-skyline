import { Reducer, AnyAction } from 'redux'
import { produce } from 'immer'

export const userReducer: Reducer<any, AnyAction> = (state = {}, action) => {
  return produce(state)
}