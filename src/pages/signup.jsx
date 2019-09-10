import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppIcon from '../images/icon.png';
import { signupUser } from '../redux/actions/userActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';


const styles = (theme) => ({
  ...theme.globalStyle
});

class Signup extends Component {

  state = {
    email: '',
    handle: '',
    password: "",
    confirmPassword: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      });
    };
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      errors: {}
    });
    const newUserData = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.signupUser(newUserData, this.props.history)
  };

  render() {
    const { classes, UI: { loading} } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm > 
          <Card className={classes.card}>
            <CardContent>
              <img src={AppIcon} alt="Login Logo" className={classes.image} />
              <Typography variant="h5" className={classes.pageTitle} >
                Sign Up
              </Typography>
              <form noValidate onSubmit={this.handleSubmit} >
                <TextField 
                  id="email" 
                  name="email" 
                  type="email" 
                  label="Email" 
                  className={classes.textField}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  autoComplete="none"
                  autoFocus={true}
                  fullWidth
                />
                <TextField 
                  id="handle" 
                  name="handle" 
                  type="text" 
                  label="Handle" 
                  className={classes.textField}
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  value={this.state.handle}
                  onChange={this.handleChange}
                  autoComplete="none"
                  autoFocus={true}
                  fullWidth
                />
                <TextField 
                  id="password" 
                  name="password"
                  type="password" 
                  label="Password" 
                  className={classes.textField}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField 
                  id="confirmpassword" 
                  name="confirmPassword"
                  type="confirmpassword" 
                  label="Confirm Password" 
                  className={classes.textField}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  fullWidth
                />
                { errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button 
                  type="submit" 
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  Sign Up
                  { loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                </Button>
                <br />
                <small>Already have an account? Click <Link to='/login' > here </Link> to login</small>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = () => ({
  signupUser, 
  // logoutUser
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));

