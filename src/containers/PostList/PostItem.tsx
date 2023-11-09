import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { useAppSelector } from '../../store/store.ts';
import { UserName } from '../../components/UserName/UserName.tsx';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = (props) => {
  const { post } = props;
  const { users } = useAppSelector((state) => state.usersReducer);

  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );

  const handleShowPostModal = (userId) => {
    setShowPostModal(true);
    setSelectedUserId(userId);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '5px',
        }}
      >
        {post.label}
        <IconButton onClick={() => handleShowPostModal(post.userId)}>
          <ArticleIcon />
        </IconButton>
      </Typography>
      <Typography sx={{ color: 'gray', fontSize: '10px' }}>
        {post.body}
      </Typography>
      <Dialog
        onClose={handleClosePostModal}
        aria-labelledby="customized-dialog-title"
        open={showPostModal}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          id="customized-dialog-title"
        >
          <Box sx={{ width: '50%' }}>{post.label}</Box>
          <Box
            sx={{
              width: '45%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            {selectedUserId && (
              <UserName
                name={
                  users.find((user: User) => user.id === selectedUserId).label
                }
              />
            )}
            <Typography>{`${post.date}`}</Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>{post.body}</Typography>
          <Typography gutterBottom></Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClosePostModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostItem;
