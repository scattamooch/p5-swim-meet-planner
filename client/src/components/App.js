import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";
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

  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true") 
  // checks if it's equal to true (someone is logged in) and defaults to false if not
  // local storage returns null if looking for a key (in this case, ID) that does not exist
  // const [activeUser, setActiveUser] = useState(localStorage.getItem("userId"))

  // function handleLogin(data) {
  //   setActiveUser(data.user_id)
  //   localStorage.setItem("userId", data.user_id)
  //   setLoggedIn(true)
  //   localStorage.setItem("isLoggedIn", true)
  //   console.log(`${data}`)
  //   console.log(`Oh shit, somebody logged in: ${activeUser}`)
  // }

  // function handleLogout() {
  //   setLoggedIn(false)
  //   localStorage.setItem("isLoggedIn", false)
  //   setActiveUser(null)
  //   localStorage.removeItem("userId", null)
  //   console.log(`Bye ${activeUser}`)
  //   console.log("Oh shit, somebody logged out")
  // }

  return (
    <div className="component-container">
      <Router>
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
      </Router>
    </div>
  )
}

export default App;
