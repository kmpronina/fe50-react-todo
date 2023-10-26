import { Reducer } from '@reduxjs/toolkit';
import { Album } from '../../../models/Album.ts';
import { AlbumReducerEnum } from './actionTypes.ts';
import { getAlbums } from '../../../api/services/albumsService.ts';

type AlbumReducerType = {
  albums: Album[];
};

const defaultState: AlbumReducerType = {
  albums: [],
};

const albumReducer: Reducer<AlbumReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case AlbumReducerEnum.SET_ALBUMS:
      console.log('in store', action);
      return { ...state, albums: action.albums };

    default:
      console.log('hello');
      return { ...state };
  }
};
// type myReducerType ={
// albums: Album[]
// }
// const myInitialState:myReducerType = {
//   albums: []
// }
// export const MyAlbumReducer = (state = myInitialState, action) => {
//   if (action.type === AlbumReducerEnum.SET_ALBUMS) {
//     return {
//       albums: action.albums
//     }
//   }

// }
export default albumReducer;
