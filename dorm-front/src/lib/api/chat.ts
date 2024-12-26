import { client, sendRequest } from "@/lib/axios";

/**
 * 룸메 매칭 신청
 */
export const createChatRoom = async (roomId: number | undefined) => {
  const response = await sendRequest({
    headers: {
      "Content-type": "application/json",
      AccessToken: "Bearer " + localStorage.getItem("accessToken"),
    },
    method: "POST",
    url: `/api/chats/members/${roomId}`,
  });
  console.log(response.data);
  return response.data;
};

export const patchLeaveChatRoom = async (roomId: string | string[]) => {
  try {
    const response = await client.patch(`/chats/rooms/${roomId}`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("채팅방 나가기 에러:", error);
  }
};
export const deleteNoMessageChatRoom = async (roomId: string | string[]) => {
  try {
    const response = await client.delete(`/chats/rooms/${roomId}/no-messages`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("채팅방 나가기 에러:", error);
  }
};

/**
 * 룸메 매칭 신청
 */
export const getRoomId = async (memberId: string | string[] | number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
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
