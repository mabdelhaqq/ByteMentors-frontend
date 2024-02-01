import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import AppRoutes from './helpers/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailProvider } from './helpers/EmailContext';
import { ThemeProvider } from './helpers/ThemeContext';
import { LanguageProvider } from './helpers/LanguageContext';
import { UserTypeProvider } from './helpers/UserTypeContext';
import { StudentProvider } from './helpers/StudentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmailProvider>
      <ThemeProvider>
        <LanguageProvider>
          <UserTypeProvider>
            <StudentProvider>
              <AppRoutes />
            </StudentProvider>
          </UserTypeProvider>
        </LanguageProvider>
      </ThemeProvider>
    </EmailProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
