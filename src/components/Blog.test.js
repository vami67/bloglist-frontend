import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

  test('after clicking the vote button two times,eventhandler is called two times', () => {

    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0
    }


    const voteBlog = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        handleVote={voteBlog}
      />
    )

    const button = component.getByText('vote')
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(voteBlog.mock.calls).toHaveLength(2)
    //component.debug()
  })



})