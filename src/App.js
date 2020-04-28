import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => setNotification(''), 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
  }

  const blogFormRef = React.createRef()

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`a new Blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => setNotification(''), 2000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new Blog' buttonLabel1='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const voteBlog = async (blog) => {

    const id = blog.id
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(id, likedBlog)

    setBlogs(
      blogs
        .map(blog => blog.id !== id ? blog : returnedBlog)
        .sort((a, b) => a.likes - b.likes)
    )
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      await blogService.removeBlog(id)
      setBlogs(
        blogs
          .filter(n => n.id !== id)
          .sort((a, b) => a.likes - b.likes)
      )
    }
  }

  if (user === null) {
    return (
      <div>
        {notification}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {notification}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>
          logout
        </button>
      </p>

      <h2>create new</h2>
      {blogForm()}

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={voteBlog}
          handleRemove={removeBlog}
        />
      )}
    </div>
  )
}

export default App