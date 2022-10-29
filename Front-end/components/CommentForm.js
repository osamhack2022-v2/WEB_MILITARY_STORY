import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../actions/post';
import useInput from '../hooks/useInput';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Badge from '@mui/material/Badge';

import StarIcon from '@mui/icons-material/Star';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  fontSize: 15,
  backgroundColor: 'grey',
  marginRight: 5,
}));

const WhiteAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  fontSize: 15,
  backgroundColor: 'black',
  border: '2px solid #FFD400',
  marginRight: 5,
}));

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  position: 'relative',
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: -40,
  zIndex: 2,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: -40,
  zIndex: 2,
  border: '1px solid #eee',
  marginTop: 3,
}));

const CommentForm = ({ post }) => {
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone, addCommentError } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const [privateMode, setPrivateMode] = useState(false);

  const onChangePrivateMode = useCallback((e) => {
    setPrivateMode(e.target.checked);
  });

  const returnAvatar = () => {
    if (me.followers >= 2) {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
        >
          <WhiteAvatar>{me?.nickname[0]}</WhiteAvatar>
        </Badge>
      );
    } else {
      return <StyledAvatar>{me?.nickname[0]}</StyledAvatar>;
    }
  };

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
    if (addCommentError) {
      alert(addCommentError);
    }
  }, [addCommentDone, addCommentError]);

  const onSubmitComment = () => {
    if (!commentText | !commentText.trim()) {
      return alert('댓글을 작성하세요.');
    }
    dispatch(
      addComment({
        postId: post.id,
        userId: me.id,
        content: commentText,
        private_mode: privateMode,
      })
    );
    setCommentText('');
  };

  return (
    <StyledFormGroup>
      <br />
      <TextField
        id="standard-textarea"
        placeholder="댓글 추가"
        multiline
        sx={{ fontSize: 15 }}
        variant="standard"
        InputProps={{
          startAdornment: returnAvatar(),
        }}
        value={commentText}
        onChange={onChangeCommentText}
      />
      {addCommentLoading ? (
        <StyledLoadingButton loading variant="outlined">
          댓글
        </StyledLoadingButton>
      ) : (
        <div>
          <label style={{ float: 'right' }}>
            <Checkbox
              name="private-mode"
              checked={privateMode}
              onChange={onChangePrivateMode}
            />
            <span>닉네임 비공개</span>
          </label>
          <StyledButton onClick={onSubmitComment}>댓글</StyledButton>
        </div>
      )}
    </StyledFormGroup>
  );
};

CommentForm.propTypes = {
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
        }),
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
        }),
      })
    ),
  }).isRequired,
};

export default CommentForm;
