import { Row, Col, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addTodo, resetTodo } from "@bootstrap/bootstrapActions"
import { useState } from "react"

const TodoForm = () => {
  const dispatch = useDispatch()
  const { isReset } = useSelector((state) => state.todos)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleInputChange = ({ target }) => {
    setError(false)
    setInput(target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return setError(true)
    dispatch(addTodo({ title: input, completed: false }))
    setInput('')
  }

  const handleResetTodo = () => dispatch(resetTodo())

  return (
    <Form onSubmit={handleFormSubmit} className="mb-3">
      <Row className="g-1">
        <Col>
          <Form.Control
            type="text"
            value={input}
            isInvalid={error}
            onChange={handleInputChange}
          />
          {error && <small className="text-danger">Input tidak boleh kosong.</small>}
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="primary">Submit</Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            disabled={isReset}
            onClick={handleResetTodo}
          >Reset Todo</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TodoForm