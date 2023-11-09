import { Reducer } from '@reduxjs/toolkit';
import { User } from '../../../models/User.ts';
import { UsersReducerEnum } from './actionTypes.ts';

type UsersReducerType = {
  users: User[];
};

const defaultState = {
  users: [],
};

const UsersReducer: Reducer<UsersReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case UsersReducerEnum.SET_USERS:
      return { ...state, users: action.users };

    default:
      return { ...state };
  }
};

export default UsersReducer;
