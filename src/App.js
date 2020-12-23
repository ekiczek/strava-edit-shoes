import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EditActivity from "./components/edit-activity.component";
import ActivitiesList from "./components/activities-list.component";
import AuthorizationRedirect from "./components/authorization-redirect.component";

import logo from "./logo.svg";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/" >
            <img src={logo} width="30" heigth="30" alt="Strava Edit Shoes" />
          </a>
          <Link to="/" className="navbar-brand">Strava Edit Shoes</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={ActivitiesList} />
        <Route path="/authorization_redirect" exact component={AuthorizationRedirect} />
        <Route path="/edit/:id" component={EditActivity} />
      </div>
    </Router>
  );
}

export default App;

