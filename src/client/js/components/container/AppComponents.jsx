import React from 'react';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function AppComponents() {
  return( 
    <Router>
      <div className="wrap">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppComponents;
