import * as React from 'react';
import { Autocomplete, TextField, Box, Button } from '@mui/material';
import { Album } from '../../models/Album.ts';
import { useAppSelector } from '../../store/store.ts';
import { getAlbums } from '../../api/services/albumsService.ts';
import { useDispatch } from 'react-redux';
import { AlbumReducerEnum } from '../../store/reducers/albumsReducer/actionTypes.ts';
import { setAlbumToStore } from '../../store/reducers/albumsReducer/actions.ts';
// import { albums } from '../../api/data.ts';

interface Props {}

const MyAutocompelte: React.FC<Props> = (props) => {
  const { albums } = useAppSelector((state) => state.albumReducer);
  const dispatch = useDispatch();

  const getData = async () => {
    const data = await getAlbums();
    // console.log(data);
    return data;
  };

  const handleClick = async () => {
    const data = await getData();
    dispatch(setAlbumToStore(data));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Autocomplete
        sx={{ width: '500px' }}
        options={albums}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default MyAutocompelte;
