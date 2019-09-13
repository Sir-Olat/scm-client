import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../utils/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// Redux
import { connect } from 'react-redux';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography  from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';


const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200,
    borderRadius: '50%',
    width: 150,
    maxHeight: 200
  },
  content: {
    padding: 5,
    objectFit: 'cover'
  }
};

class Scream extends Component {

 
  render() {
    
    dayjs.extend(relativeTime);
    const { 
      classes, 
      scream: { 
        screamId,
        body, 
        createdAt, 
        userImage, 
        userHandle, 
        likeCount, 
        commentCount 
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } =  this.props;

    const deleteButton = authenticated && userHandle === handle ?(
      <DeleteScream screamId={this.props.scream.screamId} />
    ) : null
    
    return (
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          alt="Profile Image"
          // height="140"
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography 
            variant="h5" 
            component={Link} 
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            component="p"
          >
            {body}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDIalog} />
        </CardContent>
      </Card>
    )
  }
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDIalog: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.user
});

// const mapActionToProps = {
//   likeScream,
//   unlikeScream
// };

export default connect(mapStateToProps)(withStyles(styles)(Scream));
