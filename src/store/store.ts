import { combineReducers, configureStore } from '@reduxjs/toolkit';
import albumReducer from './reducers/albumsReducer/index.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const appReducer = combineReducers({ albumReducer });

export const store = configureStore({
  reducer: appReducer,
});

export type AppStateType = ReturnType<typeof appReducer>;
export type AppDispatchType = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
