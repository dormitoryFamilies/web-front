import { Dispatch, FormEvent, SetStateAction, SVGProps, useEffect } from "react";
import * as React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import OnboardingCollegeFilter from "@/components/onboarding/OnboardingCollegeFilter";
import OnboardingDepartmentFilter from "@/components/onboarding/OnboardingDepartmentFilter";
import OnboardingDormitoryFilter from "@/components/onboarding/OnboardingDormitoryFilter";
import { putProfileData } from "@/lib/api/onboarding";
import { profileSettingAtom } from "@/recoil/onboarding/atom";
import { StepOnboarding } from "@/types/onboarding/type";
import { ARTICLE_DORM_LIST } from "@/utils/dorm";
import { COLLEGE_LIST } from "@/utils/onboarding/COLLEGE_LIST";
import { DEPARTMENT_LIST } from "@/utils/onboarding/departments";

interface Props {
  onNext: Dispatch<SetStateAction<StepOnboarding>>;
  onBefore: Dispatch<SetStateAction<StepOnboarding>>;
}
const SchoolInfoSetting = (props: Props) => {
  const { onNext, onBefore } = props;
  const [isDormFilterClick, setIsDormFilterClick] = useState(false);
  const [isCollegeFilterClick, setIsCollegeFilterClick] = useState(false);
  const [isDepartmentFilterClick, setIsDepartmentFilterClick] = useState(false);
  const [postData, setPostData] = useRecoilState(profileSettingAtom);

  useEffect(() => {
    if (!DEPARTMENT_LIST[postData.collegeType].includes(postData.departmentType)) {
      setPostData((prevState) => ({ ...prevState, departmentType: "학과선택" }));
    }
  }, [postData.collegeType]);

  const completePostData = () => {
    return !(
      postData.departmentType === "학과 선택" ||
      postData.collegeType === "단과대학교" ||
      postData.nickname === "" ||
      postData.studentCardImageUrl === "" ||
      postData.dormitoryType === "" ||
      postData.studentNumber === 0
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!completePostData()) {
      console.log("데이터가 불완전합니다.");
      return;
    }
    try {
      await putProfileData(postData).then(() => {
        onNext("PhotoStudentIDCard");
      });
      console.log("성공");
    } catch (error) {
      console.log("실패:", error);
    }
  };

  const onBack = () => {
    onBefore("NicknameSetting");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header headerType={"dynamic"} title={"프로필 설정"} onBack={onBack}></Header>
      <div className={"h-[60px]"}></div>
      <div className={"mx-5"}>
        {/* process bar*/}
        <div className={"flex items-center justify-center"}>
          <div className={"absolute w-[90%] top-15 h-1 bg-gray1 rounded-full "}>
            <div className={"absolute w-[168px] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>

        <div className={"mt-[32px] text-h2 font-semibold"}>학교 정보를 입력해주세요.</div>

        <div className={"flex flex-col gap-y-4 mt-5"}>
          {/*단과대학교*/}
          <div className={"flex flex-col gap-y-2"}>
            {/*label*/}
            <div className="text-gray5">
              단과대학교
              <span className="text-primary"> *</span>
            </div>

            <div
              onClick={() => {
                setIsCollegeFilterClick(!isCollegeFilterClick);
              }}
              className={
                isCollegeFilterClick
                  ? "flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-primaryMid"
                  : postData.collegeType === COLLEGE_LIST[0]
                    ? "flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1 text-gray4"
                    : "flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1 text-black"
              }>
              <div>{postData.collegeType}</div>
              {isCollegeFilterClick ? (
                <ClickDropUpIcon />
              ) : postData.collegeType === COLLEGE_LIST[0] ? (
                <NotClickDropDownIcon />
              ) : (
                <ClickDropDownIcon />
              )}
            </div>
            {isCollegeFilterClick ? (
              <OnboardingCollegeFilter
                colleges={COLLEGE_LIST}
                setPostData={setPostData}
                setIsClickFilter={setIsCollegeFilterClick}
              />
            ) : null}
          </div>

          {/*학과*/}
          <div className={"flex flex-col gap-y-2"}>
            {/*label*/}
            <div className="text-gray5">
              학과
              <span className="text-primary"> *</span>
            </div>

            <button
              disabled={postData.departmentType === DEPARTMENT_LIST[postData.collegeType]}
              onClick={() => {
                setIsDepartmentFilterClick(!isDepartmentFilterClick);
              }}
              className={
                isDepartmentFilterClick
                  ? "w-full flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-primaryMid"
                  : postData.departmentType === DEPARTMENT_LIST[postData.collegeType]
                    ? "w-full flex justify-between items-center px-4 py-3 rounded-[12px] bg-gray0 text-gray4"
                    : postData.departmentType === "학과선택"
                      ? "w-full flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1 text-gray4"
                      : "w-full flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1 text-black"
              }>
              <div>{postData.departmentType}</div>
              {isCollegeFilterClick ? (
                <ClickDropUpIcon />
              ) : postData.departmentType === DEPARTMENT_LIST[postData.collegeType] ? (
                <NotClickDropDownIcon />
              ) : postData.departmentType === "학과선택" ? (
                <NotClickDropDownIcon />
              ) : (
                <ClickDropDownIcon />
              )}
            </button>
            {isDepartmentFilterClick ? (
              <OnboardingDepartmentFilter
                departments={postData.collegeType !== "단과대학교" ? DEPARTMENT_LIST[postData.collegeType] : null}
                setPostData={setPostData}
                setIsClickFilter={setIsDepartmentFilterClick}
              />
            ) : null}
          </div>

          {/*학번*/}
          <div className={"flex flex-col gap-y-2"}>
            {/*label*/}
            <div className="text-gray5">
              학번
              <span className="text-primary"> *</span>
            </div>

            {/*글쓰기*/}
            <div className={"relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4"}>
              <input
                type={"number"}
                maxLength={20}
                placeholder={"학번을 입력해주세요."}
                className={"focus:outline-0 w-full"}
                onChange={(e) => {
                  setPostData((prevState) => ({ ...prevState, studentNumber: parseInt(e.target.value) }));
                }}></input>
            </div>
          </div>

          {/*기숙사*/}
          <div className={"flex flex-col gap-y-2"}>
            {/*label*/}
            <div className="text-gray5">
              기숙사
              <span className="text-primary"> *</span>
            </div>
            <div
              onClick={() => {
                setIsDormFilterClick(!isDormFilterClick);
              }}
              className={
                isDormFilterClick
                  ? "flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-primaryMid"
                  : "flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1"
              }>
              <div>{postData.dormitoryType}</div>
              {isDormFilterClick ? <ClickDropUpIcon /> : <ClickDropDownIcon />}
            </div>
            {isDormFilterClick ? (
              <OnboardingDormitoryFilter
                dormList={ARTICLE_DORM_LIST}
                setPostData={setPostData}
                setIsClickFilter={setIsDormFilterClick}
              />
            ) : null}
          </div>
        </div>
      </div>
      <button
        type={"submit"}
        disabled={!completePostData()}
        className={
          completePostData()
            ? "left-5 py-[15px] absolute bottom-5 text-white bg-primary rounded-full w-[90%] text-h5"
            : "left-5 py-[15px] absolute bottom-5 text-white bg-gray3 rounded-full w-[90%] text-h5"
        }>
        다음
      </button>
    </form>
  );
};
export default SchoolInfoSetting;

const NotClickDropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" d="m13.5 8.5-2.85 2.442a1 1 0 0 1-1.3 0L6.5 8.5" />
  </svg>
);
const ClickDropDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m13.5 8.5-2.85 2.442a1 1 0 0 1-1.3 0L6.5 8.5" />
  </svg>
);
const ClickDropUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m6.5 11.5 2.85-2.442a1 1 0 0 1 1.3 0L13.5 11.5" />
  </svg>
);
