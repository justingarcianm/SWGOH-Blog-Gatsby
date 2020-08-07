import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Timeline } from 'react-twitter-widgets'

import ResourceLinks from './ResourceLinks'

const SideBar = () => {
    return (
        <Fragment>
            <div id="sidebar" className="sticky-top pl-4">
                <h2>Twitter Feed</h2>
                <Timeline
                    dataSource={{
                        sourceType: 'url',
                        url: 'https://twitter.com/swgoh_news'
                    }}
                    options={{
                        height: '400'
                    }}
                />
                <ResourceLinks />
                <hr />
                <Link to="/" className="mr-2 text-dark text-decoration-none">Home</Link>
                <Link to="/about" className="mr-2 text-dark text-decoration-none">About</Link>
                <a href="https://www.codingjustin.com/" target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none">&copy;Justin Garcia {new Date().getFullYear()}</a>
            </div>
        </Fragment>

    )
}

export default SideBar
