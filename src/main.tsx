// src/Main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import UserProvider from './context/UserProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <BrowserRouter basename="/TrybeTunes-FE-Updated">
      <App />
    </BrowserRouter>
  </UserProvider>,
);
