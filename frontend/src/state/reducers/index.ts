import addChildReducer from './add-child-reducer'
import loginReducer from './login-reducer'

export const reducers = {
  login: loginReducer,
  logout: loginReducer,
  addChild: addChildReducer,
}
