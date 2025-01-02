import { AxiosHeaders } from "axios";

export interface ChatRoomsAxiosResponseType {
  data: ResponseChatRoomsType;
  headers: AxiosHeaders;
}
export interface ResponseChatRoomsType {
  code: number;
  data: ChatRoomsDataType;
}
export interface ChatRoomsDataType {
  nowPageNumber: number;
  isLast: boolean;
  chatRooms: ChatRoomType[];
}
export interface ChatRoomType {
  roomId: number;
  memberId: number;
  roomUUID: string;
  memberNickname: string;
  memberProfileUrl: string;
  unReadCount: number;
  lastMessage: string;
  lastMessageTime: string;
}

export interface ChatRoomMessagesAxiosResponseType {
  data: ResponseChatRoomMessagesType;
  headers: AxiosHeaders;
}

export interface ResponseChatRoomMessagesType {
  code: number;
  data: ChatRoomMessageType;
}

export interface ChatRoomMessageType {
  nowPageNumber: number;
  isLast: boolean;
  roomUUID: string;
  chatHistory: chatHistoryType[];
}

export interface chatHistoryType {
  chatMessage: string;
  isSender: false;
  roomId: number;
  roomUUID: string;
  memberId: number;
  memberNickname: string;
  memberProfileUrl: string;
  sentTime: string;
}

export interface ResponseUnreadChattingTotalCountType {
  code: number;
  data: {
    totalCount: number;
  };
}
