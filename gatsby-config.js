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
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://strapi-blog-swgoh.herokuapp.com`,
        queryLimit:1000,
        contentTypes: [`Post`, `Comment`, `Category`,`resource-link`, `User`],
        singleTypes: [`About`, `banner`]
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
