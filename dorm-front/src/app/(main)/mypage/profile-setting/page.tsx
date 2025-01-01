"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, SVGProps, useEffect, useRef, useState } from "react";
import * as React from "react";

import Header from "@/components/common/Header";
import MyProfileDormitoryFilter from "@/components/mypage/MyProfileDormitoryFilter";
import { postArticleImage } from "@/lib/api/board";
import { putProfileData } from "@/lib/api/mypage";
import useMyProfile from "@/lib/hooks/useMyProfile";
import { EditMyProfileType, MyProfileResponseType } from "@/types/mypage/type";
import { MEMBER_DORM_LIST } from "@/utils/dorm";

const ProfileSetting = () => {
  const { myProfileData } = useMyProfile();
  const router = useRouter();
  const imgRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>();
  const [isDormFilterClick, setIsDormFilterClick] = useState(false);
  const [editProfileData, setEditProfileData] = useState<EditMyProfileType>({
    memberDormitoryType: "",
    profileUrl: "",
    nickname: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 트리거

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse goalSettingData.result
   */
  const initializeEditProfileState = (apiResponse: MyProfileResponseType) => {
    return {
      memberDormitoryType: apiResponse.data.memberDormitoryType,
      nickname: apiResponse.data.nickname,
      profileUrl: apiResponse.data.profileUrl,
    };
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = myProfileData;
      if (response) {
        const initialState = initializeEditProfileState(response);
        setEditProfileData(initialState);
      }
    } catch (error) {
      // 네트워크 오류 또는 다른 예외에 대한 처리를 수행할 수 있습니다.
      console.error("Error fetching edit data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  }, [myProfileData]);

  // 이미지 미리보기 설정
  const handleImagePreview = async () => {
    const files = imgRef.current?.files;
    let reader = new FileReader();
    if (files) {
      reader.readAsDataURL(files[0]);
    }
    reader.onloadend = () => {
      setUploadImage(reader.result);
    };
  };

  /**
   * 이미지가 있을 때 form 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    if (!imgRef.current || !imgRef.current.files || imgRef.current.files.length === 0) {
      console.error("이미지가 선택되지 않았습니다.");
      return; // 파일이 없으면 함수 종료
    }

    const formData = new FormData();
    formData.append("file", imgRef.current.files[0]); // 파일을 formData에 추가

    try {
      try {
        await postArticleImage(formData).then((response) => {
          console.log("S3성공", response);
          if (response.data) {
            setEditProfileData((prevData) => ({
              ...prevData,
              profileUrl: response.data.data.imageUrl, // 업로드된 이미지 URL을 postData에 추가
            }));
          }
        });
        setIsSubmitting(true); // 제출 중 상태로 변경
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        throw error; // 오류 발생 시 throw하여 Promise.all이 멈추도록 함
      }
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    }
  };

  /**
   * 이미지가 있을 때 form 제출
   * isSubmitting 트리거를 사용하여 제출
   */
  useEffect(() => {
    if (isSubmitting) {
      submitPost();
    }
  }, [isSubmitting]);

  /**
   * put 요청
   */
  const submitPost = async () => {
    try {
      const response = await putProfileData(editProfileData); // API 호출
      console.log(response);
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false); // 제출 후 상태를 false로 변경
    }
  };

  const onBack = () => {
    router.push("/mypage");
  };

  return (
    <form onSubmit={uploadImage ? handleSubmit : submitPost}>
      <Header headerType={"dynamic"} title={"프로필 변경"} onBack={onBack} />
      <div className={"h-[40px]"} />
      {/* 프로필 업로드 */}
      <div className={"flex justify-center items-center w-full"}>
        <div className={"mt-[46px] relative w-[80px] h-[80px]"}>
          {uploadImage && typeof uploadImage === "string" ? (
            <Image alt={uploadImage} src={uploadImage} fill className={"object-cover rounded-full"} />
          ) : (
            <Image
              alt={myProfileData ? myProfileData?.data.profileUrl : "/unnimm.jpg"}
              src={myProfileData ? myProfileData?.data.profileUrl : "/unnimm.jpg"}
              fill
              className={"object-cover rounded-full"}
            />
          )}
          <input
            type={"file"}
            accept={"image/*"}
            id="image"
            name="image"
            onChange={handleImagePreview}
            multiple
            ref={imgRef}
            style={{ display: "none" }}></input>
          <label id={"image"} htmlFor="image">
            <div
              className={
                "absolute bottom-0 right-0 flex justify-center items-center w-[28px] h-[28px] rounded-full border-[1px] border-gray2 bg-white"
              }>
              <div className={"flex flex-col justify-center items-center"}>
                <CameraIcon />
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className={"flex flex-col gap-y-6 mt-[40px] mx-5"}>
        {/* 이름 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            이름
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.name}</div>
        </div>

        {/* 성별 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            성별
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.genderType}</div>
        </div>

        {/* 닉네임 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            닉네임
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"relative flex justify-between rounded-[12px] border-[1px] border-gray1 py-3 px-4"}>
            <input
              className={"focus:outline-0 w-full"}
              defaultValue={myProfileData?.data.nickname}
              onChange={(e) => {
                setEditProfileData((prevState) => ({ ...prevState, nickname: e.target.value }));
              }}></input>
          </div>
        </div>

        {/* 생년월일 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            생년월일
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.birthDate}</div>
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
                ? "relative flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-primaryMid"
                : "relative flex justify-between items-center px-4 py-3 rounded-[12px] border-[1px] border-gray1"
            }>
            <div>{editProfileData?.memberDormitoryType}</div>
            {isDormFilterClick ? <ClickDropUpIcon /> : <ClickDropDownIcon />}
          </div>
          {isDormFilterClick ? (
            <MyProfileDormitoryFilter
              dormList={MEMBER_DORM_LIST}
              setPostData={setEditProfileData}
              setIsClickFilter={setIsDormFilterClick}
            />
          ) : null}
        </div>

        {/* 단과대학 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            단과대학
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.collegeType}</div>
        </div>

        {/* 학과 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            학과
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.departmentType}</div>
        </div>

        {/* 학번 */}
        <div className={"flex flex-col gap-y-2"}>
          {/*label*/}
          <div className="text-gray5">
            학번
            <span className="text-primary"> *</span>
          </div>
          {/* 내용 */}
          <div className={"rounded-[12px] bg-gray0 py-3 px-4 text-gray4"}>{myProfileData?.data.studentNumber}</div>
        </div>
      </div>
      <button className={"ml-5 mt-10 absolute text-h5 text-white bg-primary w-[90%] rounded-full py-4"} type={"submit"}>
        완료
      </button>
    </form>
  );
};
export default ProfileSetting;
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

const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={14} fill="none" {...props}>
    <g fill="#9E9FA1" clipPath="url(#a)">
      <path d="M8.472 5.76a1.98 1.98 0 1 1 0 3.961 1.98 1.98 0 0 1 0-3.96m0-1a2.98 2.98 0 0 0-2.98 2.98 2.98 2.98 0 0 0 2.98 2.98 2.98 2.98 0 0 0 2.98-2.98 2.98 2.98 0 0 0-2.98-2.98" />
      <path d="M13.805 2.813c.92 0 1.667.747 1.667 1.667v6.227c0 .92-.747 1.666-1.667 1.666H3.14c-.92 0-1.667-.746-1.667-1.666V4.48c0-.92.747-1.667 1.667-1.667zm0-1H3.14A2.666 2.666 0 0 0 .472 4.48v6.227a2.666 2.666 0 0 0 2.667 2.666h10.666a2.666 2.666 0 0 0 2.667-2.666V4.48a2.666 2.666 0 0 0-2.667-2.667" />
      <path d="M12.479 4.907a.533.533 0 1 0 0-1.067.533.533 0 0 0 0 1.067M6.265.394H3.24c-.274 0-.5.226-.5.5 0 .273.226.5.5.5h3.026c.274 0 .5-.227.5-.5 0-.274-.226-.5-.5-.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.472.178h16v13.714h-16z" />
      </clipPath>
    </defs>
  </svg>
);
