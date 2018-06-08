import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import IndexLocation from './component/IndexLocation';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>Welcome to React Express Tutorial</h2>
          <ul>
          <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/index'}>Index Location Brazil</Link></li>
            
          </ul>
          <hr />
          <Switch>
              <Route exact path='/index' component={IndexLocation} />             
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
