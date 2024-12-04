import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: "http://13.124.186.20:8080",
  headers: {
    "Content-type": "application/json",
    AccessToken: localStorage.getItem("accessToken"),
  },
  transformResponse: [
    (data, headers) => {
      let parsedData;
      try {
        parsedData = JSON.parse(data); // JSON 문자열을 객체로 변환
      } catch (e) {
        parsedData = data; // JSON 파싱에 실패하면 원본 데이터를 유지
      }

      return {
        data: parsedData,
        headers: headers,
      };
    },
  ],
  withCredentials: true,
});

/**
 * 토큰 관리를 위한 함수
 */
const setAuthHeader = (token: string) => {
  if (token) {
    client.defaults.headers["AccessToken"] = `${token}`;
    localStorage.removeItem("accessToken");
  } else {
    delete client.defaults.headers["AccessToken"];
  }
};

/**
 * 액세스 토큰 및 리프레시 토큰을 저장하는 함수
 */
const saveTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

/**
 * 액세스 토큰 및 리프레시 토큰을 불러오는 함수
 */
const getTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

/**
 * API 요청을 보내는 함수
 * @param config 는 axios 요청
 */
const sendRequest = async (config: any) => {
  try {
    console.log("In send Request" + localStorage.getItem("accessToken"));
    console.log("최종", client.defaults.baseURL + config.url);
    return await client(config);
  } catch (error) {
    const axiosError = error as AxiosError; // AxiosError로 캐스팅
    console.log("axiosError", axiosError);
    if (axiosError.response && axiosError.response.status === 401) {
      // 만료된 액세스 ㅇ토큰일 경우 리프레시 토큰으로 갱신
      const { refreshToken } = getTokensFromLocalStorage();
      if (refreshToken) {
        try {
          const response = await client.post(
            "/api/reissue",
            {}, // 여기에 요청 바디 데이터를 넣어줘야 함
            {
              headers: {
                RefreshToken: "Bearer " + refreshToken,
              },
            },
          );

          // headers는 객체로 직접 접근
          const newAccessToken = response.headers["AccessToken"];
          const newRefreshToken = response.headers["RefreshToken"];

          if (newAccessToken && newRefreshToken) {
            // 갱신된 토큰을 처리
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setAuthHeader(newAccessToken);
            saveTokensToLocalStorage(newAccessToken, newRefreshToken);

            // 이전 요청 재시도
            return await client({
              headers: {
                AccessToken: newAccessToken,
              },
              method: config.method,
              data: config.data,
              url: config.url,
            });
          } else {
            console.error("새로운 토큰이 없습니다.");
          }
        } catch (refreshError) {
          // 리프레시 토큰으로의 갱신에 실패하면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
          console.error("토큰 갱신에 실패했습니다..", refreshError);
          // 예: 로그인 페이지로 리다이렉트
        }
      }
    }

    // 401 에러가 아니거나 리프레시 토큰이 없는 경우 또는 갱신에 실패한 경우
    throw error;
  }
};

export const swrGetFetcher = async (url: any) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기

    const response = await sendRequest({
      headers: {
        AccessToken: localStorage.getItem("accessToken"),
      },
      method: "GET",
      url: url,
    });
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("에러 발생:", error);
  }
};

export { client, getTokensFromLocalStorage, saveTokensToLocalStorage, sendRequest, setAuthHeader };
