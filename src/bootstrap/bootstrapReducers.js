import { combineReducers } from 'redux'
import bootstrapInitialState from '@bootstrap/bootstrapInitialState'
import * as CONST from '@bootstrap/bootstrapConstants'

const bootstrap = (state = bootstrapInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CONST.GET_TODO:
    case CONST.ADD_TODO:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case CONST.RESET_TODO:
      return {
        ...state,
        isReset: true,
        isLoading: true,
        isError: false,
      }
    case CONST.TOGGLE_TODO:
    case CONST.DELETE_TODO:
      return {
        ...state,
        isLoading: true,
        isError: false,
        bussyTodoIds: [...state.bussyTodoIds, payload]
      }
    case CONST.GET_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInitialLoading: false,
        todos: payload
      }
    case CONST.ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [
          ...state.todos,
          {
            ...payload,
            id: !state.todos.length ? 1 : Math.max(...state.todos.map((todo) => todo.id)) + 1
          }
        ]
      }
    case CONST.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((todo) => {
          if (todo.id !== payload) return todo
          return { ...todo, completed: !todo.completed }
        }),
        bussyTodoIds: state.bussyTodoIds.filter((id) => id !== payload)
      }
    case CONST.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo.id !== payload),
        bussyTodoIds: state.bussyTodoIds.filter((id) => id !== payload)
      }
    case CONST.RESET_TODO_SUCCESS:
      return {
        ...state,
        isReset: false,
        isLoading: false,
        isInitialLoading: false,
        todos: payload
      }
    case CONST.GET_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        isInitialLoading: false,
        isInitialLoadingError: true
      }
    case CONST.ADD_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case CONST.TOGGLE_TODO_FAILED:
    case CONST.DELETE_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        bussyTodoIds: state.bussyTodoIds.filter((id) => id !== payload)
      }
    case CONST.RESET_TODO_FAILED:
      return {
        ...state,
        isReset: false,
        isLoading: false,
        isInitialLoading: false,
        isError: true
      }
    default:
      return state
  }
}

const bootstrapReducers = combineReducers({ todos: bootstrap })

export default bootstrapReducers