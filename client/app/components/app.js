import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Main from './main';
import Nav from './nav';
import Videos from './videos';
import Info from './info';
import Header from './header';
import Contact from './contact';
import NotFound from './notfound';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={Main} />
          <Route path="/contact" component={Contact} />
          <Route path="*" component={NotFound} />
          <hr></hr>
        </Router>
      </div>
    );
  }
}

export default App;
