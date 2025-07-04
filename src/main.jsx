
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StoreProvider from './context/StoreProvider'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StoreProvider>
      <>
        <App />
        <Toaster />
      </>

    </StoreProvider>,
  </Provider>
)
