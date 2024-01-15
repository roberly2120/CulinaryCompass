import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-2of1mhq37b6qg37p.us.auth0.com"
    clientId="MjWo6ad1gPBTpRUA2JLTqsiNBfVHf7SJ"
    authorizationParams={{
      redirect_uri: window.location.origin + '/home'
    }}
  >
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Auth0Provider>
);

// testPassword1234!