import React, { useState } from 'react'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'

const Search = () => {
    const data = useStaticQuery(query)
    const [ state, setState ] = useState({
        searching:false,
        post:undefined,
        user:undefined,
        parameter:''
    })
    const handleChange = event => {
        const { name, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [name]: value,
            searching:true,
                user:data.allStrapiUser.nodes.filter( user => user.username.toLowerCase().includes(value.toLowerCase())),
                post:data.allStrapiPost.nodes.filter( post => post.title.toLowerCase().includes(value.toLowerCase()) )
        }))
        if (value.length === 0) {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
                searching:false,
                    user:undefined,
                    post:undefined
            }))
        }
    }

const handleSubmit = event => {
    event.preventDefault()
    if(state.post){
        navigate(`/post/${state.post[0].slug}`)
    }
    if(state.user && !state.post){
        navigate(`/author/${state.user[0].username}`)
    }
}

    return (
        <div>
             <form onSubmit={handleSubmit}>
      <input 
      className="form-control mr-sm-2" 
      type="search" placeholder="Search" 
      aria-label="Search" name="parameter" 
      onChange={handleChange}
      />
      {state.searching ? <div className="results rounded bg-dark text-light p-2 shadow">
          <h5>Posts</h5>
          {!state.post.length ? <h6>No Results...</h6> : 
          state.post.map( p => {
              return (
                <Link className="row text-light my-2 px-0" to={`/post/${p.slug}`} key={p.title} >
              <div className="col-8 my-auto">
              <h6>{p.title}</h6>
              </div>
              <div className="col-4 text-center">
              <img class="img-fluid" alt={p.title} src={"" || p.image.childImageSharp.fluid.src}  />
                  </div>
              </Link>
          
              )
          })
          
          }
          <hr/>
          <h5>Authors</h5>
          {!state.user.length ? <h6>No Results...</h6> : 
          state.user.map( u => {
              return(
                <Link className="row text-light my-2 px-0" to={`/author/${u.username}`} key={u.username} >
                <div className="col-8 my-auto">
              <h6>{u.username}</h6>
                </div>
                <div className="col-4 text-center">
                    <img class="img-fluid" alt={u.username} src={"" || u.userImage.childImageSharp.fluid.src}  />
                </div>
            </Link>
              )
          } )
         
          }
      </div> : ""}
    </form>
        </div>
    )
}

export const query = graphql`
{
    allStrapiUser {
        nodes {
        username
        userImage {
            childImageSharp {
            fluid(maxWidth: 100, toFormat: JPG) {
                src
            }
            }
        }
        }
    }
    allStrapiPost {
        nodes {
        slug
        title
        image {
            childImageSharp {
            fluid(maxWidth: 100, toFormat: JPG) {
                src
            }
            }
        }
        }
    }
    }    

`

export default Search