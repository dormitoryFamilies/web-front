"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  homeMenuFilterState: "breakfast" | "lunch" | "dinner";
  setHomeMenuFilterState: Dispatch<SetStateAction<"breakfast" | "lunch" | "dinner">>;
}

const HomeMenuFilter = (props: Props) => {
  const { homeMenuFilterState, setHomeMenuFilterState } = props;
  return (
    <div className="flex justify-evenly gap-x-[27px] bg-secondary h-[40px] rounded-full text-h4 font-semibold mt-3">
      <button
        onClick={() => setHomeMenuFilterState("breakfast")}
        className={
          homeMenuFilterState == "breakfast"
            ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
            : "m-1 px-6"
        }>
        아침
      </button>
      <button
        onClick={() => setHomeMenuFilterState("lunch")}
        className={
          homeMenuFilterState == "lunch"
            ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
            : "m-1 px-6"
        }>
        점심
      </button>
      <button
        onClick={() => setHomeMenuFilterState("dinner")}
        className={
          homeMenuFilterState == "dinner"
            ? "m-1 px-6 text-primary bg-primaryLight rounded-full font-semibold"
            : "m-1 px-6"
        }>
        저녁
      </button>
    </div>
  );
};
export default HomeMenuFilter;
