import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoginPage from "../components/LoginPage"
import HomePage from "../components/HomePage"

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


theme.typography.h1 = {
  fontSize: '13vw',
  [`${theme.breakpoints.up('sm')} and (orientation: landscape)`]: {
    fontSize: '8rem',
  },
};

const IndexPage = () => {
  const [user, setUser] = React.useState('');
  React.useEffect(() => {
    if (typeof window !== 'undefined' & user === "") {
      setUser(localStorage.getItem('username') || '');
    }
  })

  return(<Layout>
    <SEO title="Home" />
    <ThemeProvider theme={theme}>
      {user === "" ?
        <LoginPage setUser={setUser}/> :
        <HomePage user={user} />
      }
    </ThemeProvider>
    </Layout>
  )
}

export default IndexPage
