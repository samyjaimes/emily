import { Box, Container, Typography } from '@material-ui/core'
import React from 'react'
import { AppFrame } from '@/app/app-frame'
import { ChildrenList } from '@/components/children-list'
import { Onboarding } from '@/components/onboarding'
import { StateConsumer } from '@/context/state-context'

const Hello: React.FC = () => {
  return (
    <StateConsumer>
      {({ state }) => (
        <AppFrame requireLogin={true}>
          <Container maxWidth="xl">
            <Box my={4}>
              <Typography component="h1" variant="h2" align="center">
                {`Hi ${state.userName}!`}
              </Typography>

              {state.onboarded ? (
                <Container maxWidth="sm">
                  <ChildrenList items={state.children} />
                </Container>
              ) : (
                <Onboarding />
              )}
            </Box>
          </Container>
        </AppFrame>
      )}
    </StateConsumer>
  )
}

export default Hello
