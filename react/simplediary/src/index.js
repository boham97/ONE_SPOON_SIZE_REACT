import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* 
// StrictMode: 두번씩 렌더링 합니다. 콘솔로그 2번찍힘;;
  <React.StrictMode>
    <App />
  </React.StrictMode>
   */
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

