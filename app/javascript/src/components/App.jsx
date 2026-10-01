import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Feed from './Feed';
import Login from './Login';
import Signup from './Signup';
import UserPage from './UserPage';

const App = () => {
  return (
    <Router>
      <Switch>

       <Route exact path="/login" component={Login} />

       <Route exact path="/signup" component={Signup} />

      <Route exact path="/" component={Feed} />

      <Route exact path="/:username" component={UserPage} />

      </Switch>
    </Router>
  );
};

export default App;