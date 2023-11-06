import { User, UserFromPlaceholder } from '../../models/User';

export const getUsers = async (): Promise<User[]> => {
  const rawData = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: UserFromPlaceholder[] = await rawData.json();
  return data.map((user) => ({ id: user.id, label: user.name, tasks: [] }));
};
