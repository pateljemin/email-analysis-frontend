import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { CLIENT_ID } from './constants/constants';
import reportWebVitals from './reportWebVitals';
import { gapi } from "gapi-script";

const root = ReactDOM.createRoot(document.getElementById('root'));
gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: CLIENT_ID,
    plugin_name: "chat",
  });
});

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
