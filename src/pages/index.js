import React from "react"
import Layout from '../layouts/layout'

import Hero from '../Components/Home/Hero'
import HomeFeed from '../Components/Home/HomeFeed'
import SideBar from '../Components/Home/SideBar'
import SEO from '../Components/seo'

const Home = () => (
    <Layout>
      <SEO pageTitle={`Home`} desc={`Welcome to the Homepage`} />
      <Hero />
  <div className="container">
    <div className="row">
    <div className="col-md-8" >
      <HomeFeed />
    </div>
    <div className="col-md-4">
      <SideBar />
    </div>
    </div>
    
    </div>
    </Layout>
)

export default Home