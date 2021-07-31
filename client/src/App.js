import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Payments from './Payments';
import Packages from './Packages';



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const history = useHistory()

  useEffect(() => {
    fetch('/me')
      .then(r => {
        if (r.ok) {
          r.json()
            .then(u => {
              setLoggedIn(true)
              setUser(u)
              history.push('/')
            })
        } else {
          history.push('/login')
        }
      })
  }, [])

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
      .then(() => {
        console.log("logged out")
        setLoggedIn(false)
        setUser({})
      })
    history.push('/')
  }
  const loginUser = (u) => {
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }

  return (
    <div className="App">
      <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} />
      <Switch>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={loginUser} />} />
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser} />} />
        <Route exact path='/' render={routerProps => <Dashboard {...routerProps} loggedIn={loggedIn} user={user} />}></Route>
        <Route exact path='/payments' render={routerProps => <Payments {...routerProps} loggedIn={loggedIn} user={user} />}></Route>
        <Route exact path='/packages' render={routerProps => <Packages {...routerProps} loggedIn={loggedIn} user={user} />}></Route>
      </Switch>
    </div>
  );
}

export default App;
