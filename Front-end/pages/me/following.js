import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { loadFollowingsPosts, loadPopularPosts } from '../../actions/post';
import { loadMyInfo } from '../../actions/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';

const Followings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { followingsPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadMyInfo());
  }, []);

  useEffect(() => {
    dispatch(loadMyInfo());
    dispatch(loadFollowingsPosts());
  }, [router.asPath]);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if (
          window.pageYOffset + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            loadFollowingsPosts({
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
        <title>팔로잉 게시물</title>
      </Head>
      {followingsPosts.map((post, idx) => (
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

export default Followings;
