import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../actions/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    console.log(post.User.id);
    if (isFollowing) {
      dispatch(
        unfollow({
          userId: post.User.id,
        })
      );
    } else {
      dispatch(
        follow({
          userId: post.User.id,
        })
      );
    }
  }, [isFollowing]);

  if (post.User.id === me?.id) {
    return null;
  }

  if (!me?.id) {
    return null;
  }
  return (
    <>
      {followLoading || unfollowLoading ? (
        <LoadingButton
          loading
          variant="outlined"
          sx={{ border: '1px solid #2F9658' }}
        >
          Submit
        </LoadingButton>
      ) : (
        <Button onClick={onClickButton} sx={{ border: '1px solid #2F9658' }}>
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
      )}
    </>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
		UserId: PropTypes.number.isRequired,
		category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
		hidden_mode: PropTypes.bool.isRequired,
		like_counts: PropTypes.number.isRequired,
		private_mode: PropTypes.bool.isRequired,
		report_count: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      followers: PropTypes.number.isRequired,
    }),
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
      })
    ),
    Likers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        Like: PropTypes.shape({
          PostId: PropTypes.number.isRequired,
					UserId: PropTypes.number.isRequired,
					createdAt: PropTypes.string,
					updatedAt: PropTypes.string,
        })
      })
    ),
    Scrappers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        Scrap: PropTypes.shape({
          PostId: PropTypes.number.isRequired,
          UserId: PropTypes.number.isRequired,
					createdAt: PropTypes.string,
					updatedAt: PropTypes.string,
        })
      })
    )
  }).isRequired,
};
export default FollowButton;
