
 export interface PostType {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: PostType | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  createdAt: string;
}
 