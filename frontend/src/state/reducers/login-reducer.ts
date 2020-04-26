import { Reducer } from '../../interfaces/reducer.interface'
import { initialState } from '../initial-state'

export const LoginAction = 'login'
export const LogoutAction = 'logout'

const loginReducer: Reducer = (state, action) => {
  if (![LoginAction, LogoutAction].includes(action.type)) {
    return state
  }

  if (action.type === LogoutAction) {
    return initialState()
  }

  return {
    ...state,
    loggedIn: action.type === LoginAction,
    userName: typeof action.payload?.userName === 'string' ? (action.payload.userName as string) : 'Guest',
  }
}

export default loginReducer
