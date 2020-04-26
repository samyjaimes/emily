import { State } from './state.interface'

export const initialState = (): State => ({
  loggedIn: false,
  userName: 'None',
  onboarded: false,
  children: [],
})
