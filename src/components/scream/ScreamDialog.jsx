import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments'
import CommentForm from './CommentForm';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';


// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.globalStyle,
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})

class ScreamDialog extends Component {

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true })
    this.props.getScream(this.props.screamId)
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.clearErrors();
  }

  render() {
    const { 
      classes, 
      scream: {  
        screamId,
        body, 
        createdAt, 
        likeCount, 
        commentCount, 
        userImage, 
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2}/>
      </div>
      
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt={userHandle} className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography 
            component={Link}
            color="primary"
            variant="h5"
            to={`/user/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invicibleSep} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invicibleSep} />
          <Typography variant="body1">
            {body}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSep} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    )

    return ( 
      <Fragment>
        <MyButton 
          onClick={this.handleOpen} 
          tipClassName={classes.expandButton}
          tip="View scream" 
          tipPlacement='top'
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton 
            tip="Close" 
            onClick={this.handleClose} 
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }

}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))