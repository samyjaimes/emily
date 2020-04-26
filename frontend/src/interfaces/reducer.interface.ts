import { State } from '../state/state.interface'
import { Action } from './action.interface'

export interface Reducer {
  (state: State, action: Action): State
}
