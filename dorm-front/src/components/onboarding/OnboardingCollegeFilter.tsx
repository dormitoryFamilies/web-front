import React from "react";
import { SetterOrUpdater } from "recoil";

import { ProfileSettingType } from "@/types/global";

interface Props {
  colleges: string[];
  setPostData: SetterOrUpdater<ProfileSettingType>;
  setIsClickFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const OnboardingCollegeFilter = (props: Props) => {
  const { colleges, setIsClickFilter, setPostData } = props;

  const updatePostData = (college: string) => {
    setPostData((prevState) => ({
      ...prevState,
      collegeType: college,
    }));
  };

  return (
    <>
      <div className="absolute bg-white z-10 w-[90%] rounded-[20px] border-[1px] border-gray1 h-[335px] overflow-y-scroll">
        {colleges.slice(1).map((college, index) => {
          return (
            <div
              key={index}
              className="py-3 px-4 hover:bg-gray0"
              onClick={() => {
                updatePostData(college);
                setIsClickFilter(false);
              }}>
              {college}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default OnboardingCollegeFilter;
