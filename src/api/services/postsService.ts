import { Post, PostFromReJson } from '../../models/Post';

export const getPosts = async (): Promise<Post[]> => {
  const rawData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: PostFromReJson[] = await rawData.json();
  const rawDate = new Date();
  return data.map((post) => ({
    userId: post.userId,
    id: post.id,
    label: post.title,
    body: post.body,
    date: rawDate.toDateString(),
  }));
};
