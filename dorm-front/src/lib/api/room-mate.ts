import { sendRequest } from "@/lib/axios";
import { LifeStylePostType, PreferenceOrdersType } from "@/types/room-mate/type";

export const postLifestyles = async (data: LifeStylePostType) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      data: data,
      url: "/api/my/lifestyles",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};

export const patchLifestyles = async (data: {}) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      data: data,
      url: "/api/my/lifestyles",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 설정 put 에러 발생:", error);
  }
};

export const deleteLifestyles = async () => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: "/api/my/lifestyles",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 설정 put 에러 발생:", error);
  }
};

export const postPreferenceOrders = async (data: PreferenceOrdersType) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      data: data,
      url: `/api/my/preference-orders`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};

export const deletePreferenceOrders = async () => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: `/api/my/preference-orders`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 설정 post 에러 발생:", error);
  }
};

export const putPreferenceOrders = async (data: PreferenceOrdersType) => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "PUT",
      data: data,
      url: `/api/my/preference-orders`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("lifestyle 우선순위 설정 put 에러 발생:", error);
  }
};

export const postRoomMateMatching = async () => {
  try {
    const response = await sendRequest({
      headers: {
        "Content-type": "application/json",
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      url: `/api/matchings/recommendations`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
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

export const postRoomMateWish = async (memberId: string | string[] | number | undefined) => {
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

export const deleteRoomMateWish = async (memberId: string | string[] | number | undefined) => {
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
export const postRoomMateMatchingRequest = async (memberId: string | string[] | number | undefined) => {
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
export const deleteRoomMateMatchingRequest = async (memberId: number | undefined) => {
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
export const deleteCancelMatchingRequest = async (memberId: number | undefined) => {
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
