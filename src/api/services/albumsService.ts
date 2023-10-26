// export const getAlbums = async () => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
//   const data = await response.json();
//   return data;
// };
import { Album } from '../../models/Album.ts';
import { albums } from '../data.ts';

export const getAlbums = async () => {
  const newAlbums: Album[] = await new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(albums as Album[]);

      clearTimeout(timer);
    }, 1000);
  });

  return newAlbums;
};
