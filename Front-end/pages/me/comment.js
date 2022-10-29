import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import MyComments from '../../components/MyComments';
import { loadMyInfo } from '../../actions/user';
import { loadUserComments, loadPopularPosts } from '../../actions/post';
import wrapper from '../../store/configureStore';

const Comment = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [instanceComment, setInstanceComment] = useState([]);

  const { mainPosts, hasMorePosts, loadPostsLoading, userComments } =
    useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadMyInfo());
    dispatch(loadUserComments());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            loadUserComments({
              lastId,
            })
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  useEffect(() => {
    const _instance = [];
    const _instancecomment = [];
    for (let i = 0; i < userComments.length; i++) {
      if (_instance.indexOf(userComments[i][1].id) === -1) {
        _instance.push(userComments[i][1].id);
        _instancecomment.push(userComments[i]);
      }
    }
    setInstanceComment(_instancecomment);
  }, [userComments]);

  return (
    <AppLayout>
      <Head>
        <title>내가 댓글 단 글</title>
      </Head>
      {instanceComment.map((el, idx) => (
        <MyComments key={el[1].id} comments={el[0].content} post={el[1]} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await context.store.dispatch(
      loadPopularPosts({
        limit: 3,
      })
    );
    return {
      props: {},
    };
  }
);

export default Comment;
