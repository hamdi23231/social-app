// src/Types/Comment.type.ts
// src/Types/Comment.type.ts
export type CommentCreator = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type CommentType = {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post?: string;
  parentComment?: string | null;
  likes?: string[];
  createdAt: string;
  image? : string;
};