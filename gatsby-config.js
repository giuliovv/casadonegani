module.exports = {
  siteMetadata: {
    title: `Casa Bellissimi`,
    description: `Per sapere a chi tocca pulire.`,
    author: `@giuliovv`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Casa Bellissimi`,
        short_name: `Casa`,
        start_url: `/`,
        background_color: `#c41108`,
        theme_color: `#c41108`,
        display: `standalone`,
        icon: `src/images/house.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
