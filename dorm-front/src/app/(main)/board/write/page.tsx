"use client";

import * as React from "react";
import { useRecoilState } from "recoil";

import BoardTypeFilter from "@/components/board/BoardTypeFilter";
import ContentInput from "@/components/board/ContentInput";
import DormTypeFilter from "@/components/board/DormTypeFilter";
import ImageInput from "@/components/board/ImageInput";
import TagInput from "@/components/board/TagInput";
import TitleInput from "@/components/board/TitleInput";
import { postArticle } from "@/lib/api/board";
import { postDataState } from "@/recoil/board/atom";
import { BOARD_TYPE_LIST } from "@/utils/boardType";
import { DORM_LIST } from "@/utils/dorm";

const Write = () => {
  const [postData, setPostData] = useRecoilState(postDataState);

  return (
    <form>
      <div className="flex flex-col m-5 gap-y-5">
        <div className="flex justify-between gap-x-4">
          <DormTypeFilter content={DORM_LIST} title={"기숙사"} />
          <BoardTypeFilter content={BOARD_TYPE_LIST} title={"게시판"} />
        </div>
        <TitleInput essential={true} numberOfCharacters={20} label={"제목"} placeholder={"제목을 입력해주세요."} />
        <ContentInput essential={true} numberOfCharacters={300} label={"내용"} placeholder={"내용을 입력해주세요."} />
        <ImageInput></ImageInput>
        <TagInput essential={false} placeholder={"ex. #함께해요"} label={"태그"} />
      </div>
      <button
        type={"submit"}
        onClick={() => {
          postArticle(postData).then((r) => console.log("완료", r));
        }}>
        전송
      </button>
    </form>
  );
};
export default Write;
