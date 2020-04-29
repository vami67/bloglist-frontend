import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {

  test('form is submitted with correct values to callback function', () => {
    const addBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={addBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'this is title' }
    })
    fireEvent.change(author, {
      target: { value: 'this is author' }
    })
    fireEvent.change(url, {
      target: { value: 'this is url' }
    })
    fireEvent.submit(form)

    //const button = component.getByText('create')
    //fireEvent.click(button)

    expect(addBlog.mock.calls).toHaveLength(1)
    console.log(addBlog.mock.calls)
    expect(addBlog.mock.calls[0][0]['title']).toBe('this is title')
    expect(addBlog.mock.calls[0][0]['author']).toBe('this is author')
    expect(addBlog.mock.calls[0][0]['url']).toBe('this is url')
    component.debug()
  })



})