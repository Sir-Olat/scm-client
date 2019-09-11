import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import MyButton from '../utils/MyButton';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import  Button  from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Notifications from '@material-ui/icons/Notifications';


class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon  />
                  </MyButton>
                </Link>
                <MyButton tip="Post a Scream!">
                  <AddIcon  />
                </MyButton>
                <MyButton tip="Notifications">
                  <Notifications />
                </MyButton>
              </Fragment>
              ) : (
                <Fragment>
                  <Button color="inherit" component={Link} to='/'>
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to='/login'>
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to='/signup'>
                    Signup
                  </Button>  
                </Fragment>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar)
