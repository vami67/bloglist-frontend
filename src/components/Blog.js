import React from 'react'
import Togglable from './Togglable'

const Blog = ({
  blog,
  handleVote,
  handleRemove
}) => {

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
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleVote(blog)}>
            vote
          </button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button onClick={() => handleRemove(blog)}>
            remove
          </button>
        </div>
      </Togglable>
    </div>
  )

}
export default Blog