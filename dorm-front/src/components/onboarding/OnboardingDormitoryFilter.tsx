import React from "react";
import { SetterOrUpdater } from "recoil";

import { DormTypeList, ProfileSettingType } from "@/types/global";

interface Props {
  dormList: DormTypeList[];
  setPostData: SetterOrUpdater<ProfileSettingType>;
  setIsClickFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const OnboardingDormitoryFilter = (props: Props) => {
  const { dormList, setIsClickFilter, setPostData } = props;

  const updatePostData = (dormitoryName: string) => {
    setPostData((prevState) => ({
      ...prevState,
      dormitoryType: dormitoryName,
    }));
  };

  return (
    <>
      <div className="absolute bg-white z-10 w-[90%] rounded-[20px] border-[1px] border-gray1">
        {dormList.map((dorm, index) => {
          return (
            <div
              key={index}
              className="py-3 px-4 hover:bg-gray0"
              onClick={() => {
                updatePostData(dorm.name);
                setIsClickFilter(false);
              }}>
              {dorm.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default OnboardingDormitoryFilter;
