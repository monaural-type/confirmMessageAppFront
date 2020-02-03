import React from 'react';
import './css/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccessOauth from './AccessOauth.js';
import TwitterInputForm from './TwitterInputForm.js';
import Verificated from './Verificated.js';
import Verificating from './Verificating.js';
const url = 'http://0.0.0.0:5000';

//url無いの特定の要素を持ってくるためのコード(コピペ)
const getParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={AccessOauth} exact />
        <Route
          path="/twitterForm"
          render={props => <TwitterInputForm getParam={getParam} {...props} />}
          exact
        />
        <Route
          path="/verificated"
          render={props => <Verificated getParam={getParam} {...props} />}
          exact
        />
        <Route
          path="/verificating"
          render={props => <Verificating getParam={getParam} {...props} />}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
