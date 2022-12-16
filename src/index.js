import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { UserProvider } from './contexts/userInformation.context';
import { DateProvider } from './contexts/date.context';
import { LoggedDataProvider } from './contexts/loggeddata.context';
import { ActiveLogProvider } from './contexts/activelog.context';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DateProvider>
        <LoggedDataProvider>
          <ActiveLogProvider>
            <App />
          </ActiveLogProvider>
        </LoggedDataProvider>
      </DateProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
