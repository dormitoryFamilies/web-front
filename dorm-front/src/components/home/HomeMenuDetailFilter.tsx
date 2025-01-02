import { Dispatch, SetStateAction } from "react";

interface Props {
  day: "일요일" | "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일";
  setDay: Dispatch<SetStateAction<"일요일" | "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일">>;
}
const HomeMenuDetailFilter = (props: Props) => {
  const { day, setDay } = props;
  return (
    <>
      <div className={"px-5 mt-3 flex border-b border-gray1 justify-between"}>
        <div
          onClick={() => {
            setDay("일요일");
          }}
          className={
            day === "일요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          일
        </div>
        <div
          onClick={() => {
            setDay("월요일");
          }}
          className={
            day === "월요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          월
        </div>
        <div
          onClick={() => {
            setDay("화요일");
          }}
          className={
            day === "화요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          화
        </div>
        <div
          onClick={() => {
            setDay("수요일");
          }}
          className={
            day === "수요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          수
        </div>
        <div
          onClick={() => {
            setDay("목요일");
          }}
          className={
            day === "목요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          목
        </div>
        <div
          onClick={() => {
            setDay("금요일");
          }}
          className={
            day === "금요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          금
        </div>
        <div
          onClick={() => {
            setDay("토요일");
          }}
          className={
            day === "토요일" ? "py-2 px-3 text-primary border-b-[2px] border-primary" : "py-2 px-3 text-gray3"
          }>
          토
        </div>
      </div>
    </>
  );
};
export default HomeMenuDetailFilter;
