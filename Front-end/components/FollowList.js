import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { styled } from '@mui/material/styles';
import Link from 'next/link';

import ProTypes from 'prop-types';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch, useSelector } from 'react-redux';

import { removeFollow, unfollow, loadMyInfo } from '../actions/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90px',
}));

const ItemMore = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '60px',
}));

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const { Followers, Followings } = useSelector((state) => state.user);
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    setMydata(data);
  }, [data]);

  const onCancel = (userId) => () => {
    if (header === '팔로잉') {
      dispatch(
        unfollow({
          userId,
        })
      );
    } else {
      dispatch(
        removeFollow({
          userId,
        })
      );
    }
    dispatch(loadMyInfo());
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          border: '2px solid #2F9658',
          borderRadius: 2,
          marginBottom: '20px',
        }}
        subheader={<ListSubheader>{header}</ListSubheader>}
      >
        <ListItem>
          <Grid container spacing={2}>
            {mydata?.map((v, idx) => (
              <Grid item xs={3} key={v.id} sx={{ height: '50%' }}>
                <Item
                  sx={{
                    border: '2px solid #1B3B1A',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '50%',
                  }}
                >
                  <Link href={`/user/${v.id}`}>
                    <a style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{ display: 'flex' }}>
                        <Avatar sx={{ fontSize: '15px' }}>
                          {v.nickname[0]}
                        </Avatar>
                        <span
                          style={{
                            fontSize: '12px',
                            marginTop: 6,
                            marginLeft: 7,
                          }}
                        >
                          {v.nickname}
                        </span>
                      </div>
                    </a>
                  </Link>
                  {header === '팔로잉' && (
                    <>
                      <br />
                      <hr />
                      <IconButton onClick={onCancel(v.id)}>
                        <DoDisturbIcon />
                      </IconButton>
                    </>
                  )}
                </Item>
              </Grid>
            ))}
          </Grid>
        </ListItem>
        <ListItem>
          <Grid item xs={12}>
            <ItemMore>
              {loading ? (
                <LoadingButton>더보기</LoadingButton>
              ) : (
                <Button
                  sx={{ border: '1px solid #1B3B1A' }}
                  onClick={onClickMore}
                >
                  더보기
                </Button>
              )}
            </ItemMore>
          </Grid>
        </ListItem>
      </List>
    </>
  );
};
FollowList.propTypes = {
  header: ProTypes.string.isRequired,
  data: ProTypes.array.isRequired,
  onClickMore: ProTypes.func.isRequired,
  loading: ProTypes.bool.isRequired,
};

export default FollowList;
