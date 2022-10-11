import {
  takeEvery,
  takeLatest,
  call,
  put,
  fork,
  all,
  delay,
  select,
} from 'redux-saga/effects'

import {
  getTodoSuccess,
  getTodoFailed,
  addTodoSuccess,
  addTodoFailed,
  toggleTodoSuccess,
  toggleTodoFailed,
  deleteTodoSuccess,
  deleteTodoFailed,
  resetTodoSuccess,
  resetTodoFailed,
} from '@bootstrap/bootstrapActions'

import {
  addTodoApi,
  deleteTodoApi,
  getTodoApi,
  toggleTodoApi,
} from '@bootstrap/bootstrapApis'

import { toast } from 'react-toastify'
import * as CONST from '@bootstrap/bootstrapConstants'

const updateToast = (toastId, message, type, delay) => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 1500,
    delay: delay || false,
    draggable: true,
  })
}

function* getTodoAsync() {
  try {
    const response = yield call(getTodoApi)
    yield delay(1000)
    yield put(getTodoSuccess(response.data.slice(0, 5)))
  } catch (error) {
    yield put(getTodoFailed(error.response?.data))
  }
}
function* addTodoAsync({ payload }) {
  const toastId = toast.loading('Submitting new todo...')
  try {
    const response = yield call(addTodoApi, payload)
    yield put(addTodoSuccess(response.data))
    updateToast(toastId, 'Successfully submitted todo', 'success')
  } catch (error) {
    yield put(addTodoFailed(error))
    updateToast(toastId, 'Error while submitting todo', 'error')
  }
}
function* toggleTodoAsync({ payload: id }) {
  const toastId = toast.loading('Toggling todo...')
  try {
    const { ...targetTodo } = yield select((state) =>
      state.todos.todos.find((todo) => todo.id === id)
    )
    targetTodo.completed = !targetTodo.completed
    yield call(toggleTodoApi, id, targetTodo)
    yield put(toggleTodoSuccess(id))
    updateToast(toastId, 'Successfully toggled todo', 'success')
  } catch (error) {
    yield put(toggleTodoFailed(id))
    updateToast(toastId, 'Error while toggling todo', 'error', 100)
  }
}
function* deleteTodoAsync({ payload: id }) {
  const toastId = toast.loading('Deleting todo...')
  try {
    yield call(deleteTodoApi, id)
    yield put(deleteTodoSuccess(id))
    updateToast(toastId, 'Successfully deleted todo', 'success')
  } catch (error) {
    yield put(deleteTodoFailed(id))
    updateToast(toastId, 'Error while deleting todo', 'error', 100)
  }
}
function* resetTodoAsync() {
  const toastId = toast.loading('Resetting todos...')
  try {
    const response = yield call(getTodoApi)
    yield delay(1000)
    yield put(resetTodoSuccess(response.data.slice(0, 5)))
    updateToast(toastId, 'Successfully reset todos', 'success')
  } catch (error) {
    yield put(resetTodoFailed(error.response?.data))
    updateToast(toastId, 'Error while resetting todos', 'error', 100)
  }
}

function* getTodoSaga() {
  yield takeLatest(CONST.GET_TODO, getTodoAsync)
}
function* addTodoSaga() {
  yield takeEvery(CONST.ADD_TODO, addTodoAsync)
}
function* toggleTodoSaga() {
  yield takeEvery(CONST.TOGGLE_TODO, toggleTodoAsync)
}
function* deleteTodoSaga() {
  yield takeEvery(CONST.DELETE_TODO, deleteTodoAsync)
}
function* resetTodoSaga() {
  yield takeLatest(CONST.RESET_TODO, resetTodoAsync)
}

const bootstrap = [
  fork(getTodoSaga),
  fork(addTodoSaga),
  fork(toggleTodoSaga),
  fork(deleteTodoSaga),
  fork(resetTodoSaga),
]

function* bootstrapSagas() {
  yield all([...bootstrap])
}

export default bootstrapSagas
