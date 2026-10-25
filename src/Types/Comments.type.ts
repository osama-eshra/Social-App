export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface CommentType {
  _id: string;
  content: string;
  image: string | undefined;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}
