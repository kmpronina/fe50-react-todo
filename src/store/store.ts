import {
  combineReducers,
  configureStore,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import albumReducer from './reducers/albumsReducer/index.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import taskReducer from './reducers/taskReducer/index.ts';
import usersReducer from './reducers/usersReducer/index.ts';
import postReducer from './reducers/postReducer/index.ts';
import searchValueReducer from './reducers/searchValueReducer/index.ts';
// import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const appReducer = combineReducers({
  albumReducer,
  taskReducer,
  usersReducer,
  postReducer,
  searchValueReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (GetDefaultMiddleware) => [...GetDefaultMiddleware(), thunk],
});

export type AppStateType = ReturnType<typeof appReducer>;
export type AppDispatchType = ThunkDispatch<AppStateType, null, AnyAction>;

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
