import axios from "axios";

const client = axios.create({
  baseURL: "http://43.202.254.127:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":
      "Bearer eyJraWQiOiJrZXkzIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgyNjg1NSwiZXhwIjoxNzE5NDI2ODU1fQ.e6t5Jfkf5e_T9-bqp5VIl0KrMe9bYy4flh5nAe8dbcuztXUrr91I0T5w9D_kqGPO",
  },
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
