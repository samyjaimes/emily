import React from 'react'
import { Navigation } from '@/components/navigation'
import { StateConsumer } from '@/context/state-context'
import { LoginScreen } from './LoginScreen'

interface AppFrameProps {
  requireLogin?: boolean
}

export const AppFrame: React.FC<AppFrameProps> = ({ children, requireLogin }) => {
  return (
    <StateConsumer>
      {({ dispatch, state }) => (
        <>
          <Navigation loggedIn={state.loggedIn} userName={state.userName} />
          {requireLogin && !state.loggedIn ? <LoginScreen dispatch={dispatch} /> : children}
        </>
      )}
    </StateConsumer>
  )
}
