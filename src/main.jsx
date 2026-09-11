
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import StoreProvider from './context/StoreProvider'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      gcTime: 1000 * 60 * 15,    // 15 minutes garbage collection
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StoreProvider>
        <>
          <App />
          <Toaster />
        </>
      </StoreProvider>
    </Provider>
  </QueryClientProvider>
)

