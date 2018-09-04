import React from "react";
import { Router } from "react-static";
import { injectGlobal, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import "highlight.js/styles/tomorrow-night-eighties.css";
//
import Routes from "react-static-routes";
import theme from "./theme";
import AppWrapper from "./components/templates/AppWrapper";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans');
	${reset}

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'IBM Plex Sans',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-weight: 300;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-stroke: 0.45px;

    background-color: ${theme.colors.shades[0]};
    color: ${theme.colors.text};
  }

  a {
    text-decoration: none;
  }
`;

const App = () => (
	<Router autoScrollToTop>
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Routes />
			</AppWrapper>
		</ThemeProvider>
	</Router>
);

export default App;
