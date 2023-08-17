import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";
import {UserProvider} from "./UserContext";
import "../styling/App.css"
import Navbar from "./Navbar.js"
import Main from "./Main.js"
import Login from "./Login.js"
import MyTeam from "./MyTeam.js"
import OtherTeams from "./OtherTeams.js"
import Register from "./Register.js"
import RosterPlanner from "./RosterPlanner.js";
import SwimmerPage from "./SwimmerPage.js";
import TeamBuilder from "./TeamBuilder.js";

function App() {

  return (
    <div className="component-container">
      <Router>
      <UserProvider >
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        

          <Route path="/my-team">
            <MyTeam />
          </Route>

          <Route path="/other-teams">
            <OtherTeams />
          </Route>

          <Route path="/roster-planner">
            <RosterPlanner />
          </Route>

          <Route path="/swimmer">
            <SwimmerPage />
          </Route>

          <Route path="/team-builder">
            <TeamBuilder />
          </Route>

        </Switch>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App;
