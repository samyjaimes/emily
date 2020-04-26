import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import React, { useReducer } from 'react'
import { getConfig } from '@/config'
import { StateProvider } from '@/context/state-context'
import { initialState, rootReducer } from '@/state'
import theme from '../src/theme'

interface AppProps {
  Component: React.ComponentClass
  pageProps: object
}

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const [state, dispatch] = useReducer(rootReducer, initialState())

  return (
    <React.Fragment>
      <Head>
        <title>{getConfig('appName')}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <StateProvider value={{ state, dispatch }}>
          <CssBaseline />
          <Component {...pageProps} />
        </StateProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
