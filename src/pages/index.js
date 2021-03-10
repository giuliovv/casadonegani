import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoginPage from "../components/LoginPage"
import HomePage from "../components/HomePage"

const IndexPage = () => {
  const [user, setUser] = React.useState(localStorage.getItem('username') || '');

  return(<Layout>
    <SEO title="Home" />
    {user == "" ?
      <LoginPage setUser={setUser}/> :
      <HomePage user={user} />
    }
      
    </Layout>
  )
}

export default IndexPage
