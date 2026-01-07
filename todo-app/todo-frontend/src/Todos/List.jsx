/* eslint-disable react/prop-types */
import TodoContainer from './TodoContainer'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <>
      {todos.map(todo => {
        return (
          <TodoContainer key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        )
      }).reduce((acc, cur, idx) => [...acc, <hr key={`sep-${idx}`} />, cur], [])}
    </>
  )
}

export default TodoList
