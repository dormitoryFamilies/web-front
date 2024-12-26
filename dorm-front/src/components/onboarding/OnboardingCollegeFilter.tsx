import React from "react";
import { SetterOrUpdater } from "recoil";

import { ProfileSettingType } from "@/types/global";
import { CollegeType } from "@/types/onboarding/type";

interface Props {
  colleges: CollegeType[];
  setPostData: SetterOrUpdater<ProfileSettingType>;
  setIsClickFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const OnboardingCollegeFilter = (props: Props) => {
  const { colleges, setIsClickFilter, setPostData } = props;

  const updatePostData = (college: CollegeType) => {
    setPostData((prevState: ProfileSettingType) => ({
      ...prevState,
      collegeType: college,
    }));
  };

  return (
    <>
      <div className="absolute top-[85px] bg-white z-10 w-full rounded-[20px] border-[1px] border-gray1 h-[335px] overflow-y-scroll">
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
