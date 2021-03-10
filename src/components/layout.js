/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          position: "absolute",
          display: "table",
          height: "100%"
        }}
      >
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
          }}
        >
          <main
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >{children}</main>
        </div>
        
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
