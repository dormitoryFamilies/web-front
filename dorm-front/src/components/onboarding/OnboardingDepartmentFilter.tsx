import React from "react";
import { SetterOrUpdater } from "recoil";

import { ProfileSettingType } from "@/types/global";

interface Props {
  departments: string[] | null;
  setPostData: SetterOrUpdater<ProfileSettingType>;
  setIsClickFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
const OnboardingDepartmentFilter = (props: Props) => {
  const { departments, setIsClickFilter, setPostData } = props;

  const updatePostData = (department: string) => {
    setPostData((prevState) => ({
      ...prevState,
      departmentType: department,
    }));
  };

  return (
    <>
      <div className="absolute top-[85px] bg-white z-10 w-full rounded-[20px] border-[1px] border-gray1 min-h-fit max-h-[335px] overflow-y-scroll">
        {departments &&
          departments.map((department, index) => {
            return (
              <div
                key={index}
                className="py-3 px-4 hover:bg-gray0"
                onClick={() => {
                  updatePostData(department);
                  setIsClickFilter(false);
                }}>
                {department}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default OnboardingDepartmentFilter;
