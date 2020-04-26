import { Child } from '@/components/child-info'

export interface State {
  loggedIn: boolean
  userName: string
  onboarded: boolean
  children: Child[]
}
