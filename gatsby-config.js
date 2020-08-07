/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Welcome to the HoloBoard`,
    description: `A blog site for fans of the mobile game Galaxy of Heroes`,
    author: `@justin`,
    siteUrl: `https://swgoh-blog-gatsby.netlify.app/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    {
      resolve:`gatsby-plugin-sitemap`,
      options: {
        exclude:[`/edit/*`, `/create/`]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://swgoh-blog-gatsby.netlify.app/',
        sitemap: 'https://swgoh-blog-gatsby.netlify.app/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/jedi-order.png`, // This path is relative to the root of the site.
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
