import axios from "axios";

const client = axios.create({
  baseURL: "http://43.202.254.127:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":
      "Bearer eyJraWQiOiJrZXkxIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxMjU4MzQ3MywiZXhwIjoxNzEzMTgzNDczfQ.nuvkZ4U0C5AcQyrpILfk9G3eKRrtRlbrkjBDV9hrL5S40BIPxWJB7xgmoEHgWZ4m"
  },
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
