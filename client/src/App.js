import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import JokePage from './components/JokePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/jokes">Jokes</Link>
            </li>   
          </ul>
        </nav>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/jokes" component={JokePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
