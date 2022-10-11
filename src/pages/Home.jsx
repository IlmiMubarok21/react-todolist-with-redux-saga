import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { getTodo } from '@bootstrap/bootstrapActions'
import TodoForm from '@components/TodoForm'
import TodoContainer from '@components/TodoContainer'

const Home = () => {
  const dispatch = useDispatch()
  const { isInitialLoading, isInitialLoadingError, todos } = useSelector(
    (state) => state.todos
  )

  useEffect(() => {
    if (!todos.length) {
      dispatch(getTodo())
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col lg={8} className="mx-auto">
          <h1 className="text-center">My Todo App</h1>
          {(!todos.length && isInitialLoading) || isInitialLoadingError ? (
            <h3 className="text-center mt-5">
              {isInitialLoading
                ? 'Loading...'
                : 'An error occurred, try to refresh the page.'}
            </h3>
          ) : (
            <>
              <TodoForm />
              <TodoContainer />
            </>
          )}
        </Col>
      </Row>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="bottom-right"
        newestOnTop
      />
    </Container>
  )
}

export default Home
