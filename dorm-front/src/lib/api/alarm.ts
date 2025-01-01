import { sendRequest } from "@/lib/axios";

export const putAlarm = async (data: number[]) => {
  try {
    const response = await sendRequest({
      headers: {
        AccessToken: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "PUT",
      data: {
        notificationIds: data,
      },
      url: `/api/notifications/read`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("알람 읽기 에러 발생:", error);
  }
};
