import { Album } from '../../../models/Album';
import { AppDispatchType } from '../../store';
import { AlbumReducerEnum } from './actionTypes.ts';
import { getAlbums } from '../../../api/services/albumsService.ts';

// export const getAlbumsDataAction = () => async (dispatch: AppDispatchType) => {
//   const data: Album[] = await getAlbums();
//   dispatch(setAlbumToStore(data));
// };
export const setAlbumToStore = (albums: Album[]) => {
  return { type: AlbumReducerEnum.SET_ALBUMS, albums };
};
