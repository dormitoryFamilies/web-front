import Image from "next/image";
import * as React from "react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import Header from "@/components/common/Header";
import { postArticleImage } from "@/lib/api/board";
import { putProfileInitialData } from "@/lib/api/onboarding";
import { profileSettingAtom } from "@/recoil/onboarding/atom";
import { ProfileSettingType } from "@/types/global";
import { StepOnboarding } from "@/types/onboarding/type";
interface Props {
  onNext: Dispatch<SetStateAction<StepOnboarding>>;
  onBefore: Dispatch<SetStateAction<StepOnboarding>>;
}
const PhotoStudentIDCard = (props: Props) => {
  const { onNext, onBefore } = props;
  const imgRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState("");
  const [profileInitialSetting, setProfileInitialSetting] = useRecoilState<ProfileSettingType>(profileSettingAtom);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 트리거

  const onBack = () => {
    onBefore("SchoolInfoSetting");
  };

  // 이미지 미리보기 설정
  const handleImagePreview = async () => {
    const files = imgRef.current?.files;
    let reader = new FileReader();
    if (files) {
      reader.readAsDataURL(files[0]);
    }
    reader.onloadend = () => {
      setUploadImage(reader.result as string);
    };
  };

  /**
   * 이미지가 있을 때 form 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();
    if (imgRef.current?.files && imgRef.current.files[0]) {
      formData.append("file", imgRef.current.files[0]);
    }

    try {
      try {
        await postArticleImage(formData).then((response) => {
          console.log("S3성공", response);
          if (response.data) {
            setProfileInitialSetting((prevData) => ({
              ...prevData,
              profileUrl: response.data.imageUrl, // 업로드된 이미지 URL을 postData에 추가
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
      submitPost().then(() => {
        onNext("WaitForCompletion");
      });
    }
  }, [isSubmitting]);

  /**
   * put 요청
   */
  const submitPost = async () => {
    try {
      const response = await putProfileInitialData(profileInitialSetting); // API 호출
      console.log(response);
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false); // 제출 후 상태를 false로 변경
    }
  };

  return (
    <form onSubmit={uploadImage.length !== 0 ? handleSubmit : submitPost}>
      <Header headerType={"dynamic"} title={"프로필 설정"} onBack={onBack}></Header>
      <div className={"h-[60px]"}></div>
      <div className={"mx-5"}>
        {/* process bar*/}
        <div className={"flex items-center justify-center"}>
          <div className={"absolute w-[90%] top-15 h-1 bg-gray1 rounded-full "}>
            <div className={"absolute w-[70%] h-1 rounded-full bg-primaryMid"}></div>
          </div>
        </div>

        <div className={"mt-[32px] text-h2 font-semibold"}>학생증 인증을 해주세요.</div>
        {uploadImage.length !== 0 ? (
          <div className={"mt-5 flex justify-center items-center"}>
            <div className={"relative  w-[320px] h-[550px]"}>
              <Image alt={uploadImage} src={uploadImage} fill className={"absolute object-cover"} />
            </div>
          </div>
        ) : (
          <section>
            <div className={"mt-[24px]"}>충북대 학생을 인증하면</div>
            <div className={"flex flex-col gap-y-3 mt-[12px]"}>
              <div className={"flex justify-between items-center gap-x-3 bg-gray0 rounded-[20px] px-5 py-3"}>
                <Image src={"/onboarding/종이비행기.png"} width={100} height={100} alt={"/onboarding/종이비행기.png"} />
                <div className={"flex flex-col"}>
                  <div className={"font-semibold"}>기숙사에 대한 다양한 정보와</div>
                  <div className={"font-semibold"}>소식을 빠르게 전해요!</div>
                </div>
              </div>
              <div className={"flex justify-between items-center gap-x-3 bg-gray0 rounded-[20px] px-5 py-3"}>
                <Image src={"/onboarding/손뼉.png"} width={100} height={100} alt={"/onboarding/종이비행기.png"} />
                <div className={"flex flex-col"}>
                  <div className={"font-semibold"}>룸메 매칭으로</div>
                  <div className={"font-semibold"}>원하는 룸메를 추천해요!</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <input
        type={"file"}
        accept={"image/*"}
        id="image"
        name="image"
        onChange={handleImagePreview}
        multiple
        ref={imgRef}
        style={{ display: "none" }}></input>
      {uploadImage.length !== 0 ? (
        <button
          type={"submit"}
          className={
            "flex justify-center items-center left-5 py-[15px] absolute bottom-5 text-white bg-primary rounded-full w-[90%] text-h5"
          }>
          제출하기
        </button>
      ) : (
        <label id={"image"} htmlFor="image">
          <div
            className={
              "flex justify-center items-center left-5 py-[15px] absolute bottom-5 text-white bg-primary rounded-full w-[90%] text-h5"
            }>
            학생증 촬영하기
          </div>
        </label>
      )}
    </form>
  );
};
export default PhotoStudentIDCard;
