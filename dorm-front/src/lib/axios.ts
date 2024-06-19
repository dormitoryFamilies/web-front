import axios from "axios";

const client = axios.create({
  baseURL: "http://43.202.254.127:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":
      "Bearer eyJraWQiOiJrZXkxIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxODgwMTgyNSwiZXhwIjoxNzE5NDAxODI1fQ.HqPBDzXW9E71urpeMTMGJf5Hu7xej0W8A65v9x0pkLj0-pQ9OoGKrTylQrhHOyHA",
  },
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
