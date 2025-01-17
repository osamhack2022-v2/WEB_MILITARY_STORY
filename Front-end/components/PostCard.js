import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';

import StarIcon from '@mui/icons-material/Star';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CommentIcon from '@mui/icons-material/Comment';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ko';
import Router from 'next/router';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  likePost,
  removePost,
  unlikePost,
  scrapPost,
  unScrapPost,
  reportPost,
} from '../actions/post';
import FollowButton from './FollowButton';

const noname = '익명';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, isEdited, setIsEdited }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);

  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const onToggleChangePost = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onZoomPost = useCallback(() => {
    Router.push(`/post/${post.id}`).then();
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      likePost({
        postId: post.id,
      })
    );
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      unlikePost({
        postId: post.id,
      })
    );
  }, [id]);

  const onScrap = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      scrapPost({
        postId: post.id,
      })
    );
  }, [id]);

  const onUnScrap = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      unScrapPost({
        postId: post.id,
      })
    );
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      removePost({
        postId: post.id,
      })
    );
  }, [id]);

  const onReportPost = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch(
      reportPost({
        postId: post.id,
      })
    );
  }, [id]);

  const avatar = () => {
    if (!post.private_mode) {
      if (post.User?.followers >= 2) {
        return (
          <Link
            href={{ pathname: '/user', query: { id: post.User?.id } }}
            as={`/user/${post.User?.id}`}
          >
            <a style={{ textDecoration: 'none', color: 'white' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
              >
                <Avatar
                  sx={{ border: '2px solid #FFD400', bgcolor: 'black' }}
                  aria-label="recipe"
                >
                  {post.User?.nickname[0]}
                </Avatar>
              </Badge>
            </a>
          </Link>
        );
      } else {
        return (
          <Link
            href={{ pathname: '/user', query: { id: post.User?.id } }}
            as={`/user/${post.User?.id}`}
          >
            <a style={{ textDecoration: 'none', color: 'white' }}>
              <Avatar sx={{ bgcolor: '#ddd' }}>{post.User?.nickname[0]}</Avatar>
            </a>
          </Link>
        );
      }
    } else {
      return <Avatar sx={{ bgcolor: '#ddd' }}>?</Avatar>;
    }
  };

  const name = () => {
    if (!post.private_mode) {
      return post.User?.nickname;
    } else {
      return noname;
    }
  };

  const liked = post.Likers.find((v) => v.id === id);
  const scrapped = post.Scrappers.find((v) => v.id === id);

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '5%',
        marginTop: '1%',
        border: '1px solid #1B3B1A',
      }}
    >
      <CardHeader
        avatar={avatar()}
        action={
          <>
            {me && !post.private_mode && <FollowButton post={post} />}
            <>
              <IconButton onClick={handleClick}>
                <MoreVertIcon sx={{ color: '1B3B1A' }} />
              </IconButton>
              <Popover
                id="more-icon"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                {id && post.User?.id === id ? (
                  <>
                    <Button onClick={onToggleChangePost}>수정</Button>
                    <br />
                    <Button onClick={onRemovePost}>삭제</Button>
                  </>
                ) : (
                  <Button color="error" onClick={onReportPost}>
                    신고
                  </Button>
                )}
              </Popover>
            </>
          </>
        }
        title={name()}
        subheader={moment(post.createdAt).fromNow()}
      />
      <Divider sx={{ marginTop: 0, bgcolor: '#1B3B1A' }} variant="middle" />
      <CardContent>
        {post.Images[0] && <PostImages id={post.id} images={post.Images} />}
      </CardContent>
      <CardContent sx={{ marginTop: -5 }}>
        <Typography
          variant="body2"
          component="pre"
          color="text.secondary"
          sx={{ width: '100%' }}
        >
          <PostCardContent
            postId={post.id}
            postContent={post.content}
            editMode={editMode}
            onToggleChangePost={onToggleChangePost}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => Router.push(`/post/${post.id}`)}>
          <ZoomInIcon sx={{ color: '#005000' }} />
        </IconButton>
        {scrapped ? (
          <IconButton aria-label="scrap" onClick={onUnScrap}>
            <StarBorderIcon style={{ color: '#FCE285' }} />
          </IconButton>
        ) : (
          <IconButton aria-label="unScrap" onClick={onScrap}>
            <StarBorderIcon />
          </IconButton>
        )}
        {post.Scrappers.length}
        {liked ? (
          <IconButton aria-label="like" onClick={onUnlike}>
            <FavoriteBorderOutlinedIcon style={{ color: 'red' }} />
          </IconButton>
        ) : (
          <IconButton aria-label="unlike" onClick={onLike}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}
        {post.Likers.length}

        <ExpandMore
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon sx={{ color: '#A0DE98' }} />
        </ExpandMore>
        <span
          style={{ fontSize: 13, marginRight: '5%' }}
        >{`${post.Comments.length}개의 댓글`}</span>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {me && (
            <>
              <CommentForm post={post} /> <br />
            </>
          )}

          {post.Comments?.map((el, idx) => (
            <List
              sx={{ width: '100%', bgcolor: 'background.paper' }}
              key={el.id}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {el.private_mode && <Avatar alt="Remy Sharp">?</Avatar>}
                  {!el.private_mode && el.User?.followers >= 2 && (
                    <Link
                      href={{ pathname: '/user', query: { id: el.User?.id } }}
                      as={`/user/${el.User?.id}`}
                    >
                      <a style={{ textDecoration: 'none', color: 'white' }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            sx={{
                              border: '2px solid #FFD400',
                              bgcolor: 'black',
                            }}
                          >
                            {el.User?.nickname[0]}
                          </Avatar>
                        </Badge>
                      </a>
                    </Link>
                  )}
                  {!el.private_mode && el.User?.followers < 2 && (
                    <Link
                      href={{ pathname: '/user', query: { id: el.User?.id } }}
                      as={`/user/${el.User?.id}`}
                    >
                      <a style={{ color: 'white', textDecoration: 'none' }}>
                        <Avatar alt="Remy Sharp">{el.User?.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
                </ListItemAvatar>
                {el.private_mode === false && (
                  <ListItemText
                    primary={el.User?.nickname}
                    secondary={
                      <React.Fragment>
                        <pre style={{ marginTop: 0 }}>{el.content}</pre>
                      </React.Fragment>
                    }
                  />
                )}
                {el.private_mode && (
                  <ListItemText
                    primary={'익명' + el.anonymous}
                    secondary={
                      <React.Fragment>
                        <pre style={{ marginTop: 0 }}>{el.content}</pre>
                      </React.Fragment>
                    }
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" sx={{ marginTop: -3 }} />
            </List>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

PostCard.propTypes = {
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

export default PostCard;
