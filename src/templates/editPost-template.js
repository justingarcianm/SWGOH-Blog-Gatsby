import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import EditPost from '../Components/EditPost'
import SEO from '../Components/seo'

const EditPostTemplate = ({ data }) => {
    const [ edit, setEdit ] = useState(undefined)
    useEffect(() => {
        setEdit(data)
    },[data])
    if(!edit) return null
    return (
        <Layout>
          <SEO pageTitle={`Edit: ${edit.strapiPost.title}`} desc={`FIll out the form to update or delete post`} />
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