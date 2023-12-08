import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import AppRoutes from './helpers/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailProvider } from './helpers/EmailContext';
import { ThemeProvider } from './helpers/ThemeContext';
import { UserTypeProvider } from './helpers/UserTypeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmailProvider>
      <ThemeProvider>
        <UserTypeProvider>
          <AppRoutes />
        </UserTypeProvider>
      </ThemeProvider>
    </EmailProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
