import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel='view' buttonLabel1='hide'>

        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.author}</div>
      </Togglable>

    </div>
  )

}
export default Blog