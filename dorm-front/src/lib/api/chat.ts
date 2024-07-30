import { client } from "@/lib/axios";

export const createChatRoom = async (roomId: number) => {
  try {
    const response = await client.post(`/chats/members/${roomId}`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("채팅방 생성시 에러:", error);
  }
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
