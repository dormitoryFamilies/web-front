export type BoardType = "전체" | "도와주세요" | "함께해요" | "나눔해요" | "궁금해요" | "분실신고";

export type BoardSortType = "createdAt" | "popularity";

export type BoardStatusType = "전체" | "모집완료" | "모집중";

export interface ResponseArticleType {
  code: number;
  data: Paging;
}
export interface Paging {
  nowPageNumber: number;
  isLast: boolean;
  articles: ArticleType[];
}
export interface ArticleType {
  articleId: number;
  nickName: string;
  profileUrl: string;
  boardType: string;
  title: string;
  content: string;
  wishCount: number;
  isWished: boolean;
  commentCount: number;
  viewCount: number;
  status: string;
  createdAt: string;
  thumbnailUrl: string;
}

export interface ResponseArticleDetailType {
  code: number;
  data: ArticleDetailType;
}
export interface ArticleDetailType {
  articleId: number;
  memberId: number;
  nickName: string;
  profileUrl: string;
  memberDormitory: string;
  articleDormitory: string;
  boardType: string;
  tags: string;
  title: string;
  content: string;
  wishCount: number;
  isWished: boolean;
  status: string;
  createdAt: string;
  imagesUrls: string[];
}

//댓글
export interface ResponseArticleDetailAllCommentsType {
  code: number;
  data: ArticleDetailAllCommentsType;
}
export interface ArticleDetailAllCommentsType {
  totalCount: number;
  comments: ArticleDetailCommentType[];
}

export interface ArticleDetailCommentType {
  commentId: number;
  memberId: number;
  profileUrl: string;
  nickName: string;
  createdAt: string;
  content: string;
  isWriter: boolean;
  isDeleted: boolean;
  replyComments?: ArticleDetailReplyCommentsType[];
}
export interface ArticleDetailReplyCommentsType {
  replyCommentId: number;
  memberId: number;
  profileUrl: string;
  nickName: string;
  createdAt: string;
  content: string;
  isWriter: boolean;
}

// 댓글 post Type
export interface PostCommentType {
  content: string;
}

export interface ArticlePostType {
  dormitoryType: string;
  boardType: string;
  title: string;
  content: string;
  tags: string;
  imagesUrls: string[];
}

/**
 * 찜 목록
 */

export interface ArticleWishType {
  memberId: number;
  nickName: string;
  dormitoryType: string;
  profileUrl: string;
}

export interface ArticleWishListType {
  members: ArticleWishType[];
}

export interface ResponseArticleWishListType {
  code: number;
  data: ArticleWishListType;
}
