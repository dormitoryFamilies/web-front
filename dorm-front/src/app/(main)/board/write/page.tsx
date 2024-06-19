"use client";

import * as React from "react";
import { FormEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import BoardTypeFilter from "@/components/board/BoardTypeFilter";
import ContentInput from "@/components/board/ContentInput";
import DormTypeFilter from "@/components/board/DormTypeFilter";
import ImageInput from "@/components/board/ImageInput";
import TagInput from "@/components/board/TagInput";
import TitleInput from "@/components/board/TitleInput";
import Header from "@/components/common/Header";
import { postArticle, postArticleImage } from "@/lib/api/board";
import { fileListAtom, imgUrlListAtom, postDataState } from "@/recoil/board/atom";
import { BOARD_TYPE_LIST } from "@/utils/boardType";
import { DORM_LIST } from "@/utils/dorm";

const Write = () => {
  const [postData, setPostData] = useRecoilState(postDataState);
  const [imgUrlList, setImgUrlList] = useRecoilState<string[]>(imgUrlListAtom); //이미지 URL string
  const [fileList, setFileList] = useRecoilState<File[]>(fileListAtom); //이미지 file
  // 입력 필드 목록을 관리하는 상태
  const [tags, setTags] = useState<string[]>([]);

  /**
   * Tags 새 입력 필드를 추가하는 함수
   */
  const addTags = () => {
    setTags([...tags, ""]); // 기존 입력 필드 목록에 빈 문자열을 추가
  };

  /**
   * Tags 입력 필드 값 변경 함수
   */
  const handleChangeTags = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...tags];
    newInputs[index] = event.target.value; // 변경된 값을 해당 인덱스의 입력 필드에 반영
    setTags(newInputs);
  };

  /**
   * Tags 삭제
   */
  const deleteTags = (i: number) => {
    const copyOnlineCourseInputs = [...tags];
    setTags(copyOnlineCourseInputs.filter((onlineCourseInput, index) => index != i));
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    const tagsString = tags.join("#");
    setPostData((prevData) => ({
      ...prevData,
      tags: `#${tagsString}`,
    }));

    for (const file of fileList) {
      const formData = new FormData();
      formData.append("file", file);

      // formData의 내용을 확인
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      try {
        const response = await postArticleImage(formData);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    }

    try {
      const response = await postArticle(postData); // API 호출
      console.log(response);
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <Header headerType={"dynamic"} title={"긱사생활 글쓰기"}></Header>
      <div className={"h-[60px]"} />
      <form onSubmit={handleSubmit} className={"relative"}>
        <div className="flex flex-col m-5 gap-y-5">
          <div className="flex justify-between gap-x-4">
            <DormTypeFilter content={DORM_LIST} title={"기숙사"} />
            <BoardTypeFilter content={BOARD_TYPE_LIST} title={"게시판"} />
          </div>
          <TitleInput essential={true} numberOfCharacters={20} label={"제목"} placeholder={"제목을 입력해주세요."} />
          <ContentInput essential={true} numberOfCharacters={300} label={"내용"} placeholder={"내용을 입력해주세요."} />
          <ImageInput
            fileList={fileList}
            imgUrlList={imgUrlList}
            setFileList={setFileList}
            setImgUrlList={setImgUrlList}></ImageInput>
          {/* 인강 추천 태그 세션*/}
          <TagInput
            label={"태그"}
            tags={tags}
            deleteTags={deleteTags}
            addTags={addTags}
            handleChangeTags={handleChangeTags}
            placeholder={"#태그추가"}
            essential={false}></TagInput>
        </div>
        <button className={"absolute text-h5 text-white bg-primary w-full rounded-full py-4"} type={"submit"}>
          작성완료
        </button>
      </form>
    </div>
  );
};
export default Write;
