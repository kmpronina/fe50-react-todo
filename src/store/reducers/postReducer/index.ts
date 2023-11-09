import { Reducer } from '@reduxjs/toolkit';
import { Post } from '../../../models/Post';
import { PostReducerEnum } from './actionTypes.ts';

type UsersReducerType = {
  posts: Post[];
};

const defaultState = {
  posts: [],
};

const postReducer: Reducer<UsersReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case PostReducerEnum.SET_POSTS:
      return { ...state, posts: action.posts };

    default:
      return { ...state };
  }
};

export default postReducer;
