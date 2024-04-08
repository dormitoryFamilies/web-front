"use client";

import * as React from "react";

import ImageInput from "@/components/board/ImageInput";
import Filter from "@/components/common/Filter";
import Input from "@/components/common/Input";
import { BOARD_TYPE_LIST } from "@/utils/boardType";
import { DORM_LIST } from "@/utils/dorm";
import { postArticle } from "@/lib/api/board";
import { useRecoilState } from "recoil";
import { postDataState } from "@/recoil/board/atom";

const Write = () => {
  const [postData, setPostData] = useRecoilState(postDataState);

  return (
    <form>
      <div className="flex flex-col m-5 gap-y-5">
        <div className="flex justify-between gap-x-4">
          <Filter usage={"dormList"} content={DORM_LIST} title={"기숙사"} />
          <Filter usage={"boardTypeList"} content={BOARD_TYPE_LIST} title={"게시판"} />
        </div>
        <Input
          usage={"title"}
          essential={true}
          numberOfCharacters={20}
          title={"제목"}
          placeholder={"제목을 입력해주세요."}
        />
        <Input
          usage={"content"}
          essential={true}
          numberOfCharacters={300}
          title={"내용"}
          placeholder={"내용을 입력해주세요."}
          inputClassName={"h-[200px] placeholder focus:placeholder-top"}
        />
        <ImageInput></ImageInput>
        <Input essential={false} usage={"tag"} placeholder={"ex. #함께해요"} title={"태그"} className={"w-[130px]"} />
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
