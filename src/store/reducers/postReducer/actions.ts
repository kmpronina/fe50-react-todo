import { Post } from '../../../models/Post';
import { AppDispatchType } from '../../store';
import { PostReducerEnum } from './actionTypes.ts';
import { getPosts } from '../../../api/services/postsService.ts';

export const getPostsDataAction = () => {
  return async (dispatch: AppDispatchType) => {
    const data: Post[] = await getPosts();
    dispatch(setPostsToStore(data));
  };
};
export const setPostsToStore = (posts: Post[]) => {
  return { type: PostReducerEnum.SET_POSTS, posts };
};
