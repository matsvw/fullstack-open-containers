import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoContainer from './TodoContainer'

describe('TodoContainer', () => {
  it('renders todo text', () => {
    const todo = { id: 1, text: 'Buy milk', done: false }
    render(
      <TodoContainer
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('calls deleteTodo when Delete is clicked', () => {
    const todo = { id: 1, text: 'Buy milk', done: false }
    const deleteTodo = vi.fn()

    render(
      <TodoContainer
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={() => {}}
      />
    )

    fireEvent.click(screen.getByText('Delete'))
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  it('calls completeTodo when Set as done is clicked', () => {
    const todo = { id: 1, text: 'Buy milk', done: false }
    const completeTodo = vi.fn()

    render(
      <TodoContainer
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={completeTodo}
      />
    )

    fireEvent.click(screen.getByText('Set as done'))
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })

  it('shows done message when todo.done = true', () => {
    const todo = { id: 1, text: 'Buy milk', done: true }

    render(
      <TodoContainer
        todo={todo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })
})