import { AxiosHeaders } from "axios";

export interface AlarmResponseAxiosType {
  data: AlarmResponseType;
  headers: AxiosHeaders;
}

export interface AlarmResponseType {
  code: number;
  data: AlarmType;
}

export interface AlarmType {
  isLast: boolean;
  notifications: Notification[];
}

export interface Notification {
  notificationId: number;
  type: NotificationType;
  sender: string;
  articleTitle: string;
  isRead: boolean;
  targetId: number;
  createdAt: string;
}

export type NotificationType =
  | "ARTICLE_COMMENT"
  | "ARTICLE_WISH"
  | "ARTICLE_REPLY_COMMENT"
  | "MEMBER_FOLLOW"
  | "CHAT"
  | "MATCHING_WISH"
  | "MATCHING_REQUEST"
  | "MATCHING_REJECT"
  | "MATCHING_ACCEPT";
