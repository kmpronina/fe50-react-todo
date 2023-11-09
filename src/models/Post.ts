export type Post = {
  userId: number;
  id: number;
  label: string;
  body: string;
  date: string;
};

export type PostFromReJson = {
  userId: number;
  id: number;
  title: string;
  body: string;
  date: string;
};
