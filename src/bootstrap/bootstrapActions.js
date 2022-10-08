import * as CONST from '@bootstrap/bootstrapConstants'

export const getTodo = (isReset) => ({
  type: CONST.GET_TODO,
  payload: isReset ? true : false
})
export const getTodoSuccess = (payload) => ({
  type: CONST.GET_TODO_SUCCESS,
  payload
})
export const getTodoFailed = (error) => ({
  type: CONST.GET_TODO_FAILED,
  payload: error
})

export const addTodo = (payload) => ({
  type: CONST.ADD_TODO,
  payload
})
export const addTodoSuccess = (payload) => ({
  type: CONST.ADD_TODO_SUCCESS,
  payload
})
export const addTodoFailed = (error) => ({
  type: CONST.ADD_TODO_FAILED,
  payload: error
})

export const toggleTodo = (id) => ({
  type: CONST.TOGGLE_TODO,
  payload: id
})
export const toggleTodoSuccess = (id) => ({
  type: CONST.TOGGLE_TODO_SUCCESS,
  payload: id
})
export const toggleTodoFailed = (id) => ({
  type: CONST.TOGGLE_TODO_FAILED,
  payload: id
})

export const deleteTodo = (id) => ({
  type: CONST.DELETE_TODO,
  payload: id
})
export const deleteTodoSuccess = (id) => ({
  type: CONST.DELETE_TODO_SUCCESS,
  payload: id
})
export const deleteTodoFailed = (id) => ({
  type: CONST.DELETE_TODO_FAILED,
  payload: id
})

export const resetTodo = () => ({
  type: CONST.RESET_TODO
})
export const resetTodoSuccess = (payload) => ({
  type: CONST.RESET_TODO_SUCCESS,
  payload
})
export const resetTodoFailed = (error) => ({
  type: CONST.RESET_TODO_FAILED,
  payload: error
})