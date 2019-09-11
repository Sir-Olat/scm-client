import React, { Component } from 'react'
import Grid  from '@material-ui/core/Grid';
import Axios from 'axios';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

class Home extends Component {

  state = {
    screams: null
  }

  componentDidMount(){
   
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream) => <Scream key={scream.screamId} scream={scream} /> )
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={4} >
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

export default Home

