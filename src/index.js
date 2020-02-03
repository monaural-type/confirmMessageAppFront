import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppTest from './AppTest';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';

console.log(document.cookie);
ReactDOM.render(
  <CookiesProvider>
    <AppTest />
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
