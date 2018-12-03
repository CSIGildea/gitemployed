import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from './pages/mainpage';
import About from './pages/about';
import Contact from './pages/contact';
import User from './pages/user';
import Error from './pages/error';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const app = document.getElementById('root');

ReactDOM.render((
   <Router>
      <div>
      	<Switch>
        <Route exact path="/" component={Mainpage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/error" component={Error} />
        <Route path="/:user" component={User} />
        </Switch>
      </div>
   </Router >
),app);