import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { StateConsumer } from '@/context/state-context'
import { ChildInfo } from './child-info'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const Onboarding: React.FC = () => {
  const classes = useStyles()

  return (
    <StateConsumer>
      {({ dispatch }) => (
        <Container maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="p" align="center">
              Tell us about your children:
            </Typography>
            <ChildInfo
              onChange={(payload) => {
                dispatch({ type: 'addChild', payload })
              }}
            />
          </div>
        </Container>
      )}
    </StateConsumer>
  )
}
