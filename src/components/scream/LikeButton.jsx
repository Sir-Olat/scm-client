import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {

  likedScream = () => {
    if(this.props.user.likes && 
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId)
      ){
      return true;
    } else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };


  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="like" tipPlacement="top">
          <FavoriteBorderIcon color="primary" />
        </MyButton>
      </Link>
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
    return likeButton;
  }
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
