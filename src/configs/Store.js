import { createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { logger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import bootstrapReducers from '@bootstrap/bootstrapReducers'
import bootstrapSagas from '@bootstrap/bootstrapSagas'
import Persist from './Persist'

let finalReducers = bootstrapReducers
if (Persist.active) {
  const persistConfig = Persist.storeConfig
  finalReducers = persistReducer(persistConfig, bootstrapReducers)
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (import.meta.env.MODE !== 'production') {
  middlewares.push(logger)
}

const store = createStore(finalReducers, applyMiddleware(...middlewares))
sagaMiddleware.run(bootstrapSagas)

export const persistor = persistStore(store)

export default store
