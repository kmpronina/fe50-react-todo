import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import Header from '../../containers/Header/Header.tsx';
import AlbumsTable from '../../containers/AlbumTable/AlbumTable.tsx';
import Dialog from '../../containers/MyDialog/MyDialog.tsx';
import MyModal from '../../containers/MyModal/MyModal.tsx';
import MyAutocompelte from '../../components/MyAutocomplete/MyAutocomplete.tsx';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number>(null);

  const handlePlayVideo = () => {
    if (videoRef.current === null) return;
    videoRef.current.play();
  };
  const handleStartInterval = () => {
    const intervalId = setInterval(() => {
      console.log('hello');
    }, 500);
    //@ts-ignore
    intervalRef.current = intervalId;
  };

  const handleStopInterval = () => {
    if (intervalRef.current === null) return;
    const intervalId = intervalRef.current;
    clearInterval(intervalId);
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: '20px' }}>
        <video
          controls
          style={{ height: 100, width: 150 }}
          src={
            'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4'
          }
          ref={videoRef}
        ></video>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant={'contained'} onClick={handlePlayVideo}>
            play
          </Button>
          <Button variant={'outlined'} onClick={handleStartInterval}>
            start interval
          </Button>
          <Button variant={'outlined'} onClick={handleStopInterval}>
            stop interval
          </Button>
        </Box>
      </Box>
      <Dialog />
      <MyModal />
      <MyAutocompelte />
      <AlbumsTable />
    </>
  );
};

export default Home;
