import React from 'react';
import { ListItem, List } from '@mui/material';
import { User } from '../../models/User';

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = (props) => {
  const { user } = props;

  return (
    <List>
      <ListItem>Username: {user.username}</ListItem>
      <ListItem> Email: {user.email}</ListItem>
      <ListItem> Phone: {user.phone}</ListItem>
      <ListItem> Website: {user.website}</ListItem>
      <ListItem> City: {user.address.city}</ListItem>
      <ListItem>Street: {user.address.street} </ListItem>
      <ListItem>Suite: {user.address.suite} </ListItem>
      <ListItem>Company name: {user.company.name} </ListItem>
      <ListItem>Company catchphrase: {user.company.catchPhrase} </ListItem>
      <ListItem>Company description: {user.company.bs} </ListItem>
    </List>
  );
};
