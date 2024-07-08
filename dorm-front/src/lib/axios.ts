import axios from "axios";

const client = axios.create({
  baseURL: "http://43.202.254.127:8080/api",
  headers: {
    "Content-type": "application/json",
    "AccessToken":  process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
});

export const swrGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
