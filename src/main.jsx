import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss';
import App from './App.jsx'
import store from './redux/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';

createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </ConfigProvider>
)
