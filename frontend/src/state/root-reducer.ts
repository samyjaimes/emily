import { Reducer } from '../interfaces/reducer.interface'
import { reducers } from './reducers'

export const rootReducer: Reducer = (state, action) => {
  const index = Object.keys(reducers).indexOf(action.type)

  console.log('rootReducer', action, index)

  if (index === -1) {
    return state
  }

  return reducers[action.type](state, action)
}
