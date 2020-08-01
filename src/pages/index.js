import React from "react"
import Layout from '../layouts/layout'

import Hero from '../Components/Home/Hero'
import HomeFeed from '../Components/Home/HomeFeed'
import SideBar from '../Components/Home/SideBar'

const Home = () => (
    <Layout>
      <Hero />
  <div className="container">
    <div className="row">
    <div className="col-md-9" >
      <HomeFeed />
    </div>
    <div className="col-md-3">
      <SideBar />
    </div>
    </div>
    
    </div>
    </Layout>
)

export default Home