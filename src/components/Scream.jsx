import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../utils/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography  from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200,
    width: 150,
    maxHeight: 200
  },
  content: {
    padding: 5,
    objectFit: 'cover'
  }
};

class Scream extends Component {

  likedScream = () => {
    if(this.props.user.likes && 
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId)
      ){
      return true;
    } else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

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
    const likeButton = !authenticated ? (
      <MyButton tip="like" tipPlacement="top">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : ( 
      this.likedScream() ? (
        <MyButton tip="unlike" tipPlacement="top" onClick={this.unlikeScream}>
            <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="like" tipPlacement="top" onClick={this.likeScream}>
            <FavoriteBorderIcon color="primary" />
        </MyButton>
      )
    );
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
            to={`/users/${userHandle}`}
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
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>
    )
  }
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Scream));
