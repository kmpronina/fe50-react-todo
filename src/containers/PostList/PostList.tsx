import React, { useEffect } from 'react';
import { List, ListItem } from '@mui/material';
import { Post } from '../../models/Post';
import PostItem from './PostItem.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getPostsDataAction } from '../../store/reducers/postReducer/actions.ts';
import { useAppDispatch } from '../../store/store.ts';

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = (props) => {
  // const { posts } = useAppSelector((state) => state.postReducer);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getPostsDataAction());
  // }, []);
  const { posts } = props;

  return (
    <List>
      {posts.map((post: Post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </List>
  );
};

export default PostList;
