import React, { useCallback } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import StarIcon from '@mui/icons-material/Star';

import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logoutLoading, me } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logout());
    Router.push('/').then();
  }, []);

  const returnAvatar = () => {
    if (me.Followers.length >= 2) {
      return (
        <Link href={`/user/${me.id}`}>
          <a style={{ textDecoration: 'none' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={<StarIcon sx={{ color: '#FFD400' }} />}
            >
              <Avatar
                sx={{ border: '2px solid #FFD400', bgcolor: 'black' }}
                aria-label="recipe"
              >
                {me.nickname[0]}
              </Avatar>
            </Badge>
          </a>
        </Link>
      );
    } else {
      return (
        <Link href={`/user/${me.id}`}>
          <a style={{ textDecoration: 'none' }}>
            <Avatar sx={{ bgcolor: 'grey' }} aria-label="recipe">
              {me.nickname[0]}
            </Avatar>
          </a>
        </Link>
      );
    }
  };

  return (
    <Card
      sx={{
        width: '90%',
        backgroundColor: '#fefefe',
        border: '2px solid #2F9658',
      }}
    >
      <CardHeader
        avatar={returnAvatar()}
        action={
          logoutLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ border: '2px solid #1B3B1A' }}
            >
              로그아웃
            </LoadingButton>
          ) : (
            <Button
              sx={{ marginTop: '6px', border: '2px solid #1B3B1A' }}
              onClick={onLogout}
            >
              로그아웃
            </Button>
          )
        }
        title={
          <Link href={`/user/${me.id}`}>
            <a style={{ textDecoration: 'none' }}>
              <span style={{ color: 'black' }}>{me.nickname}</span>
            </a>
          </Link>
        }
      />

      <Divider variant="middle" sx={{ bgcolor: '#1B3B1A' }} />
      <CardActions disableSpacing>
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={4}>
            <Button
              sx={{ marginLeft: '15%', border: '2px solid #1B3B1A' }}
              onClick={() => Router.push('/profile')}
            >
              내 정보
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ border: '2px solid #1B3B1A' }}
              onClick={() => Router.push('/profile')}
            >
              팔로잉 {me.Followings.length}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ border: '2px solid #1B3B1A' }}
              onClick={() => Router.push('/profile')}
            >
              팔로워 {me.Followers.length}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default UserProfile;
