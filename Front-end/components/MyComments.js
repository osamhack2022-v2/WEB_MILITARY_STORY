import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
} from '../actions/post';
import FollowButton from './FollowButton';

moment.locale('ko');

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

const MyComments = ({ comments, post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onZoomPost = useCallback(() => {
    Router.push(`/post/${post.id}`).then();
  }, []);
	

  const avatar = () => {
    if (post.private_mode) {
      return <Avatar sx={{ bgcolor: '#ddd' }}>?</Avatar>;
    } else if (post.User.followers >= 2) {
      return (
        <Link
          href={{ pathname: '/user', query: { id: post.User.id } }}
          as={`/user/${post.User.id}`}
        >
          <a style={{ textDecoration: 'none', color: 'white' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
            >
              <Avatar sx={{ bgcolor: '#000', border: '2px solid #FFD400' }}>
                {post.User.nickname[0]}
              </Avatar>
            </Badge>
          </a>
        </Link>
      );
    } else {
      return (
        <Link
          href={{ pathname: '/user', query: { id: post.User.id } }}
          as={`/user/${post.User.id}`}
        >
          <a style={{ textDecoration: 'none', color: 'white' }}>
            <Avatar sx={{ bgcolor: '#ddd' }}>{post.User.nickname[0]}</Avatar>
          </a>
        </Link>
      );
    }
  };

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

  const liked = post.Likers.find((v) => v.id === id);
  const scrapped = post.Scrappers.find((v) => v.id === id);

  return (
    <Card sx={{ width: '100%', marginBottom: '5%', border: '1px solid #1B3B1A' }}>
      <CardHeader
        avatar={avatar()}
        title={post.User.nickname}
        subheader={moment(post.createdAt).fromNow()}
      />
			<Divider sx={{ marginTop: 0, bgcolor: '#1B3B1A' }} variant="middle" />
      <CardContent>
        {post.Images.length > 0 && <PostImages images={post.Images} />}
      </CardContent>
      <CardContent>
        <Typography variant="body2" component="pre" color="text.secondary">
          <pre style={{ maxWidth: '100%', marginTop:0 }}>
            <PostCardContent
              postId={post.id}
              postContent={post.content}
              editMode={false}
              onToggleChangePost={null}
            />
          </pre>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => Router.push(`/post/${post.id}`)}>
          <ZoomInIcon />
        </IconButton>
        {scrapped ? (
          <StarBorderIcon style={{ color: '#FCE285' }} />
        ) : (
          <StarBorderIcon />
        )}
        <span style={{ marginRight: 6 }}>{post.Scrappers.length}</span>
        {liked ? (
          <FavoriteBorderOutlinedIcon style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
        {post.Likers.length}
        <ExpandMore
          onClick={() => Router.push(`/post/${post.id}`)}
          aria-label="show more"
        >
          <CommentIcon sx={{ color: '#A0DE98' }} />
        </ExpandMore>
        <span
          style={{ fontSize: 13, marginRight: '5%' }}
        >{`${post.Comments.length}개의 댓글`}</span>
      </CardActions>
      <CardContent>
        <List sx={{ width: '100%', bgcolor: ' background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Link
                href={{ pathname: '/user', query: { id: id } }}
                as={`/user/${id}`}
              >
                <a style={{ textDecoration: 'none', color: 'white' }}>
                  {me?.followers >= 2 && (
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
                    >
                      <Avatar
                        alt="me"
                        sx={{
                          backgroundColor: 'black',
                          border: '2px solid #FFD400',
                        }}
                      >
                        나
                      </Avatar>
                    </Badge>
                  )}
                  {me?.followers < 2 && <Avatar alt="me">나</Avatar>}
                </a>
              </Link>
            </ListItemAvatar>
            <ListItemText
              primary="나"
              secondary={<React.Fragment>{comments}</React.Fragment>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </CardContent>
    </Card>
  );
};

MyComments.propTypes = {
	comments: PropTypes.string.isRequired,
	post: PropTypes.shape({
		id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
		Comments: PropTypes.arrayOf(
		  PropTypes.shape({
				id: PropTypes.number.isRequired,
			})
		),
		Images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				src: PropTypes.string,
			})
		),
		User: PropTypes.shape({
			id: PropTypes.number.isRequired,
			nickname: PropTypes.string.isRequired,
			followers: PropTypes.number.isRequired,
		}),
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
			}))
	})
}

export default MyComments;
