import React from 'react'
import { initialState, State } from '@/state'

interface StateContextProps {
  state: State
  dispatch: React.Dispatch<unknown>
}

export const StateContext = React.createContext<StateContextProps>({
  state: initialState(),
  dispatch: (action) => void action,
})

export const StateProvider = StateContext.Provider
export const StateConsumer = StateContext.Consumer
