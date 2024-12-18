import { sendRequest } from "@/lib/axios";

export const postFollow = async (memberId: number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      url: `/api/members/${memberId}/follows`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로우 post 에러 발생:", error);
  }
};

export const deleteFollowing = async (memberId: number | undefined) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: `/api/members/${memberId}/followings`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("팔로우 delete 에러 발생:", error);
  }
};
