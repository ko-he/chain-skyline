import React from 'react'
import { Provider } from 'react-redux'
import TopPage from './pages/TopPage'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TopPage />
      </div>
    </Provider>
  )
}

export default App
