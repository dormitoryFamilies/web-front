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
  memberNickname: string;
  unReadCount: number;
  lastMessage: string;
  lastMessageTime: string;
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
  chatId: number;
  senderId: number;
  message: string;
  sentTime: string;
}

export interface ResponseUnreadChattingTotalCountType {
  code: number;
  data: {
    totalCount: number;
  };
}
