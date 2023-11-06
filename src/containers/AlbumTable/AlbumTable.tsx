import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { SortDirectionEnum, SortDirectionType } from './types.ts';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import { Album } from '../../models/Album.ts';
import { getAlbums } from '../../api/services/albumsService.ts';
import { setAlbumToStore } from '../../store/reducers/albumsReducer/actions.ts';

enum TableCellForSortEnum {
  userId = 'userId',
  id = 'id',
}
interface Props {}

type TableCellForSortEnumType =
  | TableCellForSortEnum.userId
  | TableCellForSortEnum.id;

const AlbumsTable: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.albumReducer);
  // const getData = async () => {
  //   const data = await getAlbums();
  //   console.log(data);
  //   return data;
  // };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirectionEnum.asc
  );
  const [sortField, setSortField] = useState<
    TableCellForSortEnum.userId | TableCellForSortEnum.id
  >(TableCellForSortEnum.id);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await getAlbums();
      console.log(data, 'data');
      dispatch(setAlbumToStore(data));
      setIsLoading(false);
    };
    getData();
  }, [setIsLoading]);

  const handleChangeSortDirection = (fieldToSort: TableCellForSortEnumType) => {
    if (sortField !== fieldToSort) {
      setSortField(fieldToSort);
      setSortDirection(SortDirectionEnum.asc);
      return;
    }
    setSortDirection((prevState) =>
      prevState === SortDirectionEnum.desc
        ? SortDirectionEnum.asc
        : SortDirectionEnum.desc
    );
  };

  const sortFunction = (frAlbum: Album, scAlbum: Album): 1 | 0 | -1 => {
    if (sortDirection === SortDirectionEnum.asc) {
      return frAlbum[sortField] === scAlbum[sortField]
        ? 0
        : frAlbum[sortField] > scAlbum[sortField]
        ? -1
        : 1;
    }

    if (sortDirection === SortDirectionEnum.desc) {
      return frAlbum[sortField] === scAlbum[sortField]
        ? 0
        : frAlbum[sortField] > scAlbum[sortField]
        ? 1
        : -1;
    }
    return 0;
  };

  const handleAlbumsConsole = () => {
    console.log(albums);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Button onClick={handleAlbumsConsole}>Albums from table</Button>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'lightgray' }}>
            <TableCell>Title</TableCell>
            <TableCell
              onClick={() =>
                handleChangeSortDirection(TableCellForSortEnum.userId)
              }
            >
              <Box sx={{ display: 'flex' }}>
                UserId
                <Box
                  sx={{
                    opacity: sortField === TableCellForSortEnum.userId ? 1 : 0,
                    transform: `rotate(${
                      sortDirection === SortDirectionEnum.asc ? 0 : 180
                    }deg)`,
                  }}
                >
                  <ArrowDownward />
                </Box>
              </Box>
            </TableCell>
            <TableCell
              onClick={() => handleChangeSortDirection(TableCellForSortEnum.id)}
            >
              <Box sx={{ display: 'flex' }}>
                Id
                <Box
                  sx={{
                    opacity: sortField === TableCellForSortEnum.id ? 1 : 0,
                    transform: `rotate(${
                      sortDirection === SortDirectionEnum.asc ? 0 : 180
                    }deg)`,
                  }}
                >
                  <ArrowDownward />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && `${'Wait for...'}`}
          {!isLoading &&
            albums.sort(sortFunction).map((album: Album) => (
              <TableRow key={album.id}>
                <TableCell>{album.label}</TableCell>
                <TableCell>{album.userId}</TableCell>
                <TableCell>{album.id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default AlbumsTable;
