import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from '@configs/Store'
import { persistor } from './configs/Store'
import Home from '@pages/Home'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  )
}

export default App
