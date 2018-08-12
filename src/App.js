import React from 'react'
import { Router } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import 'highlight.js/styles/tomorrow-night-eighties.css'
//
import Routes from 'react-static-routes'
import theme from './theme'
import AppWrapper from './components/templates/AppWrapper'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans');

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'IBM Plex Sans',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-weight: 300;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-stroke: 0.45px;

    margin: 0;
    padding: 0;
    background-color: ${theme.colors.shades[0]};
    color: ${theme.colors.text};
  }

  a {
    text-decoration: none;
  }
`

const App = () => (
  <Router>
    <AppWrapper>
      <Routes />
    </AppWrapper>
  </Router>
)

export default hot(module)(App)
