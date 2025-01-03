import React from "react";

import { DormTypeList } from "@/types/global";
import { EditMyProfileType } from "@/types/mypage/type";

interface Props {
  dormList: DormTypeList[];
  setPostData: React.Dispatch<React.SetStateAction<EditMyProfileType>>;
  setIsClickFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyProfileDormitoryFilter = (props: Props) => {
  const { dormList, setIsClickFilter, setPostData } = props;

  const updatePostData = (dormitoryName: string) => {
    setPostData((prevState) => ({
      ...prevState,
      memberDormitoryType: dormitoryName,
    }));
  };

  return (
    <>
      <div className="absolute bg-white z-10 w-[90%] h-[240px] overflow-y-scroll rounded-[20px] border-[1px] border-gray1">
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
export default MyProfileDormitoryFilter;
