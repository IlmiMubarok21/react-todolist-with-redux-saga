import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import bootstrapReducers from '@bootstrap/bootstrapReducers'
import bootstrapSagas from '@bootstrap/bootstrapSagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (import.meta.env.MODE !== 'production') {
  middlewares.push(logger)
}

const store = createStore(
  bootstrapReducers,
  applyMiddleware(...middlewares)
)
sagaMiddleware.run(bootstrapSagas)

export default store