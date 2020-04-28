import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 'likes'
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the url and likes are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'likes'
    )
    expect(div).toHaveTextContent(
      'url'
    )
    expect(div).not.toHaveTextContent(
      'title'
    )
    expect(div).not.toHaveTextContent(
      'author'
    )
    
  })

  test('after clicking the button, url and likes are also displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    expect(div).toHaveTextContent(
      'likes'
    )
    expect(div).toHaveTextContent(
      'url'
    )
    expect(div).not.toHaveTextContent(
      'title'
    )
    expect(div).not.toHaveTextContent(
      'author'
    )
    component.debug()
  })



})