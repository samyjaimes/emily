import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import React from 'react'
import { getConfig } from '@/config'

export default () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography component="h1" variant="h2" align="center">
          {`Welcome to ${getConfig('appName')}!`}
        </Typography>

        <Typography component="h2" variant="h5" align="center">
          An application that plans activities for kids
        </Typography>

        <Box display="flex" justifyContent="center" m={8}>
          <Link href="/hello">
            <Button variant="contained" color="primary">
              Get started!
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
