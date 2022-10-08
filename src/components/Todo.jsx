import { ListGroup, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { deleteTodo, toggleTodo } from "@bootstrap/bootstrapActions"

const Todo = ({ todo, index }) => {
  const isOnProcess = useSelector((state) => state.todos.bussyTodoIds.includes(todo.id))
  const dispatch = useDispatch()

  const handleToggleTodo = ({ target: { id } }) => {
    dispatch(toggleTodo(Number(id)))
  }

  const handleDeleteTodo = ({ target: { id } }) => {
    dispatch(deleteTodo(Number(id)))
  }

  return (
    <ListGroup.Item className={`d-flex justify-content-between align-items-center${isOnProcess ? ' bg-light' : ''}`}>
      <div className={todo.completed ? "text-decoration-line-through" : ""}>
        {`${index + 1}. ${todo.title}`}
      </div>
      <div>
        <Button
          id={todo.id}
          variant="primary"
          size="sm"
          disabled={isOnProcess}
          onClick={handleToggleTodo}
        >Mark as {todo.completed ? "undone" : "done"}</Button>
        {' '}
        <Button
          id={todo.id}
          variant="danger"
          size="sm"
          disabled={isOnProcess}
          onClick={handleDeleteTodo}
        >Delete</Button>
      </div>
    </ListGroup.Item>
  )
}

export default Todo