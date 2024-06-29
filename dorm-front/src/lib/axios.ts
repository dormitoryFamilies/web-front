import axios from "axios";

const client = axios.create({
  baseURL: "http://43.202.254.127:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJraWQiOiJrZXkyIiwiYWxnIjoiSFMzODQifQ.eyJzdWIiOiJoc2tlMzYwMkBkYXVtLm5ldCIsImlhdCI6MTcxOTY1NzE0MywiZXhwIjoxNzIwMjU3MTQzfQ.ilHx8ORD6bo0SB9FSOdv5fdoBKSucUtrHZN6Gzk06V6uwOXft7G9x8Eoh6C2o84N",
  },
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
