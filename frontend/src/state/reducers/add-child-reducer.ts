import { Reducer } from '../../interfaces/reducer.interface'

const addChildReducer: Reducer = (state, action) => {
  const newState = { ...state }
  newState.children = state.children || []

  const isFirst = newState.children.length < 1

  newState.children.push(action.payload)
  if (isFirst) {
    newState.onboarded = true
  }

  return newState
}

export default addChildReducer
