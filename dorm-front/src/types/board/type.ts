export interface PostType {
  articleId: number;
  author: string;
  boardType: string;
  title: string;
  content: string;
  wishCount: number;
  commentCount: number;
  status: number;
  createdDate: string;
  thumbnailUrl: string;
}
export interface PostDetailType {
  articleId: number;
  dormitoryId: number;
  profileUrl: string;
  nickName: string;
  boardType: string;
  title: string;
  content: string;
  tags: string[];
  wishCount: number;
  commentCount: number;
  status: number;
  createdDate: string;
  images: ImageType[];
  comments: CommentsDetailType[];
}

export interface ImageType {
  imageId: number;
  imageName: string;
  s3Url: string;
}

export interface CommentsDetailType {
  commentId: number;
  memberId: number;
  profileUrl: string;
  nickName: string;
  createdDate: string;
  content: string;
  replyComments?: CommentsDetailType[];
}
