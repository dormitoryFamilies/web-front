import { getAccessToken, sendRequest } from "@/lib/axios";

/**
 * 룸메 매칭 신청
 */
export const createChatRoom = async (roomId: string | string[] | number | undefined) => {
  const response = await sendRequest({
    headers: {
      "Content-type": "application/json",
      AccessToken: `Bearer ${getAccessToken()}`,
    },
    method: "POST",
    url: `/api/chats/members/${roomId}`,
  });
  console.log(response.data);
  return response.data;
};

/**
 * 채팅방 나가기
 */
export const patchLeaveChatRoom = async (roomId: string | string[]) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "PATCH",
      url: `/api/chats/rooms/${roomId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 나가기 에러:", error);
  }
};

/**
 * 채팅방 재입장
 */
export const patchRejoinChatRoom = async (memberId: string | string[] | number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "PATCH",
      url: `/api/chats/members/${memberId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 재입장 에러:", error);
  }
};

/**
 * 채팅방 나가기
 */
export const deleteChatRoom = async (roomId: string | string[]) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "DELETE",
      url: `/api/chats/rooms/${roomId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 삭제 에러:", error);
  }
};

/**
 * 채팅 내역이 없을 경우 채팅방 없애기 api
 */
export const deleteNoMessageChatRoom = async (roomId: string | string[]) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "DELETE",
      url: `/api/chats/rooms/${roomId}/no-messages`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 나가기 에러:", error);
  }
};

/**
 * memberId로 채팅방 ID 불러오는 api
 */
export const getRoomId = async (memberId: string | string[] | number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "GET",
      url: `/api/chats/members/${memberId}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("멤버아이디로 채팅룸 아이디 불러오는데 에러:", error);
  }
};

/**
 * 채팅방 검색
 */
export const getSearchChatRoom = async (searchValue: string, size: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "GET",
      url: `/api/chats/rooms/search?q=${searchValue}&page=0&size=${size}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 검색 에러:", error);
  }
};

/**
 * 메시지 검색
 */
export const getSearchChatMessage = async (searchValue: string, sort: string, size: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: `Bearer ${getAccessToken()}`,
      },
      method: "GET",
      url: `/api/chats/messages/search?q=${searchValue}&sort=${sort}&page=0&size=${size}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("채팅방 검색 에러:", error);
  }
};
