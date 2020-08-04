import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import EditPost from '../Components/EditPost'

const EditPostTemplate = ({ data }) => {
    const [ edit, setEdit ] = useState(undefined)
    useEffect(() => {
        setEdit(data)
    },[data])
    if(!edit) return null
    return (
        <Layout>
            <div id="editPost">
                <EditPost post={edit.strapiPost} categories={edit.allStrapiCategory.nodes}/>
            </div>
        </Layout>
    )
}

export const query = graphql`
query ($slug: String!) {
    strapiPost(slug: {eq: $slug}) {
      title
      strapiId
      content
      slug
      updated_at(fromNow: true)
      user {
        username
        id
      }
      image {
        publicURL
        id
      }
      category {
        catTitle
        id
      }
    }
    allStrapiCategory {
      nodes {
        catTitle
        strapiId
      }
    }
  }
`

export default EditPostTemplate