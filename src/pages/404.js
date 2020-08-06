import React from 'react'
import { Link } from 'gatsby'

import Layout from '../layouts/layout'
import SEO from '../Components/seo'

const NotFound = () => {
    return (
        <Layout>
            <SEO pageTitle={`404`} desc={`Page not found`} />
        <div className="container text-center mt-5">
            <h2 className="display-1">404</h2>
            <p>This page does not exist. <Link to="/">Go back.</Link></p>
        </div>
        </Layout>
    )
}

export default NotFound