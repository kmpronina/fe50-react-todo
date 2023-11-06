import { User } from '../../../models/User.ts';
import { AppDispatchType } from '../../store.ts';
import { UsersReducerEnum } from './actionTypes.ts';
import { getUsers } from '../../../api/services/userSercvice.ts';

export const getUsersDataAction = () => {
  return async (dispatch: AppDispatchType) => {
    const data: User[] = await getUsers();
    dispatch(setUsersToStore(data));
  };
};

export const setUsersToStore = (users: User[]) => {
  return { type: UsersReducerEnum.SET_USERS, users };
};
