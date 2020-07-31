/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://strapi-blog-swgoh.herokuapp.com`,
        queryLimit:1000,
        contentTypes: [`Category`, `Comment`, `Post`, `Resource Link`, `User` ],
        singleTypes: [`About`, `Hero`]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Play`,
            variants: [`400`, `700`],
          },
          {
            family: `Raleway`,
            variants: [`300`,`400`, `700`]
          },
        ],
      },
    }
  ],
}
