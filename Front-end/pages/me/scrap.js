import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadMyInfo } from '../../actions/user';
import Head from 'next/head';
import { loadUserScraps, loadPopularPosts } from '../../actions/post';
import wrapper from '../../store/configureStore';

const Scrap = () => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const { me } = useSelector((state) => state.user);

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(loadMyInfo());
    dispatch(loadUserScraps());
  }, [asPath]);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            loadUserScraps({
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
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>나의 스크랩</title>
      </Head>
      {mainPosts?.map((post, idx) => (
        <PostCard key={idx} post={post} />
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

export default Scrap;
