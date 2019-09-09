import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import themeFile from './utils/theme';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

// Components 
import Navbar from './components/Navbar';
import AuthRoute from './utils/AuthRoute';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} authenticated={authenticated}/>
                <AuthRoute exact path='/signup' component={Signup} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
      
    )
  }
}

export default App;
