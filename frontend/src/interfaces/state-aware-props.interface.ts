import React from 'react'
import { State } from '@/state'

export interface StateAwareProps {
  state: State
  dispatch: React.Dispatch<unknown>
}
