import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import Todo from "@components/Todo"

const TodoContainer = () => {
  const { todos } = useSelector((state) => state.todos)

  return (
    !todos.length ? (
      <h3 className="text-center">You haven't added any todo yet.</h3>
    ) : (
      <ListGroup>
        {todos.map((todo, index) => (
          <Todo key={todo.id} {...{todo, index}} />
        ))}
      </ListGroup>
    )
  )
}

export default TodoContainer