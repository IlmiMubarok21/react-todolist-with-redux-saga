import { Provider } from "react-redux"
import store from "@configs/Store"
import Home from "@pages/Home"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.min.css"

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App