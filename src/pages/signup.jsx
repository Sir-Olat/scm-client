import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import AppIcon from '../images/icon.png';
import Axios from 'axios';

const styles = (theme) => ({
  ...theme.globalStyle
});

class Signup extends Component {

  state = {
    email: '',
    handle: '',
    password: "",
    confirmPassword: "",
    loading: false,
    errors: {},
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
    Axios.post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
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
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);

