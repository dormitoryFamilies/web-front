import { client, sendRequest } from "@/lib/axios";
import { LifeStylePostType, PreferenceOrdersType } from "@/types/room-mate/type";

export const postLifestyles = async (data: LifeStylePostType) => {
  try {
    const response = await client.post("/my/lifestyles", data, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};

export const postPreferenceOrders = async (data: PreferenceOrdersType) => {
  try {
    const response = await client.post("/my/preference-orders", data, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};

export const postRoomMateMatching = async () => {
  try {
    const response = await client.post("/matchings/recommendations", {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("룸메 매칭 post 에러 발생:", error);
  }
};

export const postMatchingRequest = async (memberId: number) => {
  try {
    const response = await client.post(`/members/${memberId}/matching-requests`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("룸메 매칭 post 에러 발생:", error);
  }
};

export const deleteMatchingRequest = async (memberId: number) => {
  try {
    const response = await client.delete(`/members/${memberId}/matching-requests`, {
      headers: {
        "Content-type": "application/json",
        "AccessToken": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("룸메 매칭 post 에러 발생:", error);
  }
};

export const getAllDoomzList = async (searchValue: string) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "GET",
      url: `/api/matchings/members/search?q=${searchValue}&page=0&size=5`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("검색 결과 에러:", error);
  }
};

export const postRoomMateWish = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      url: `/api/members/${memberId}/roommate-wishes`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("룸메매칭 찜 누르기 에러:", error);
  }
};

export const deleteRoomMateWish = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: `/api/members/${memberId}/roommate-wishes`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("룸메매칭 찜 취소 누르기 에러:", error);
  }
};

/**
 * 룸메 매칭 신청
 */
export const postRoomMateMatchingRequest = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      url: `/api/members/${memberId}/matching-requests`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("룸메매칭 신청 에러:", error);
  }
};

/**
 * 내가 받은/보낸 신청 거절/취소
 */
export const deleteRoomMateMatchingRequest = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: `/api/members/${memberId}/matching-requests`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("룸메매칭 거절/취소 에러:", error);
  }
};

/**
 * 내가 받은 매칭 신청 수락
 */
export const postAcceptMatchingRequest = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      url: `/api/members/${memberId}/matching-results`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("내가 받은 매칭 신청 수락 에러:", error);
  }
};

/**
 * 이미 맺어진 매칭 취소
 */
export const deleteCancelMatchingRequest = async (memberId: number) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: `/api/members/${memberId}/matching-results`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("이미 맺어진 매칭 취소 에러:", error);
  }
};
