import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { loadMyInfo } from '../../actions/user';
import { loadPost, loadPopularPosts } from '../../actions/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyInfo());
  }, [router.asPath]);

  return (
    <AppLayout>
      <div>
        {singlePost && (
          <>
            <Head>
              <title>{singlePost.User.nickname} 님의 글</title>
              <meta name="description" content={singlePost.content} />
              <meta
                property="og:title"
                content={`${singlePost.User.nickname}님의 게시글`}
              />
              <meta property="og:description" content={singlePost.content} />
            </Head>
            <PostCard post={singlePost} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await context.store.dispatch(loadPost({ postId: context.params.id }));
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

export default Post;
