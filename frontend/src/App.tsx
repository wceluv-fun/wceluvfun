import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./hooks/Auth";
import PrivateRoute from "./component/PrivateRoute";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./views/Home";
import Verify from "./views/verify";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

import MatchCards from "./component/MatchCards";
import UserCard from "./component/UserCard";
//import Dashboard from "./views/Dashboard";
import "./styles/main.scss";

function App() {
  return (
   // <Dashboard/>
    //<UserCard name={"Vinayak"} nickname="vin" year="2" department="cse" publicKey="123" />
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/verify/:id">
              <Verify />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
