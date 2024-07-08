"use client";

import Header from "@/components/common/Header";
import DormTypeFilter from "@/components/board/DormTypeFilter";
import { ARTICLE_DORM_LIST } from "@/utils/dorm";
import BoardTypeFilter from "@/components/board/BoardTypeFilter";
import { BOARD_TYPE_LIST } from "@/utils/boardType";
import TitleInput from "@/components/board/TitleInput";
import ContentInput from "@/components/board/ContentInput";
import ImageInput from "@/components/board/ImageInput";
import TagInput from "@/components/board/TagInput";
import * as React from "react";
import useGetArticleDetail from "@/lib/hooks/useGetArticleDetail";
import { useRecoilState } from "recoil";
import {
  deleteS3UrlListAtom,
  fileListAtom,
  imgUrlListAtom,
  pastImageUrlListAtom,
  postDataState,
  selectedArticleIdAtom,
} from "@/recoil/board/atom";
import { FormEvent, useEffect, useState } from "react";
import { ArticleDetailType, ArticlePostType } from "@/types/board/type";
import { deleteArticleImage, postArticle, postArticleImage, putArticle } from "@/lib/api/board";

const Edit = () => {
  const [selectedArticleId, setSelectedArticleId] = useRecoilState(selectedArticleIdAtom);
  const { articleDetail, articleMutate } = useGetArticleDetail(selectedArticleId);
  const [postData, setPostData] = useRecoilState(postDataState);
  const [imgUrlList, setImgUrlList] = useRecoilState<string[]>(imgUrlListAtom); //이미지 URL string
  const [fileList, setFileList] = useRecoilState<File[]>(fileListAtom); //이미지 file
  const [deleteS3UrlList, setDeleteS3UrlList] = useRecoilState(deleteS3UrlListAtom);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태를 관리
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false); //비동기 제출 트리거
  // 입력 필드 목록을 관리하는 상태
  const [tags, setTags] = useState<string[]>([]);

  /**
   * Recoil 초기화 함수
   */
  const initializeEditPostData = (apiResponse: ArticleDetailType) => {
    return {
      dormitoryType: apiResponse.articleDormitory,
      boardType: apiResponse.boardType,
      title: apiResponse.title,
      content: apiResponse.content,
      tags: apiResponse.tags,
      imagesUrls: apiResponse.imagesUrls,
    };
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (articleDetail) {
      const initialState = initializeEditPostData(articleDetail);
      setPostData(initialState);
      setImgUrlList(articleDetail.imagesUrls);

      // tags 문자열을 분리하여 state로 설정
      const tagArray = articleDetail.tags.split("#").filter(tag => tag.trim() !== "");
      setTags(tagArray);
    }
  }, [articleDetail, setPostData]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tagsString = tags.join("#");
    setPostData((prevData) => ({
      ...prevData,
      tags: `#${tagsString}`,
    }));

    setIsReadyToSubmit(true);
  };

  useEffect(() => {
    const processSubmission = async () => {
      if (isReadyToSubmit) {
        try {
          for (const url of deleteS3UrlList) {
            const formData = new FormData();
            formData.append("imageUrl", url);

            console.log("Deleting:", url);
            await deleteArticleImage(formData);
            console.log("S3 삭제 성공");
          }

          const uploadedImgUrls: string[] = [];
          for (const file of fileList) {
            const formData = new FormData();
            formData.append("file", file);

            console.log("Uploading:", file.name);
            const response = await postArticleImage(formData);
            console.log("S3 업로드 성공", response);
            uploadedImgUrls.push(response.data.imageUrl);
          }

          const updatedPostData = {
            ...postData,
            imagesUrls: [...postData.imagesUrls, ...uploadedImgUrls],
          };
          setPostData(updatedPostData);

          const response = await putArticle(updatedPostData, selectedArticleId);
          console.log("게시글 제출 성공", response);
        } catch (error) {
          console.error("폼 제출 중 오류 발생:", error);
        } finally {
          setIsReadyToSubmit(false);
        }
      }
    };

    processSubmission();
  }, [isReadyToSubmit]);

  return (
    <div>
      <Header headerType={"dynamic"} title={"긱사생활 글수정"}></Header>
      <div className={"h-[60px]"} />
      <form onSubmit={handleSubmit} className={"relative"}>
        <div className="flex flex-col m-5 gap-y-5">
          <div className="flex justify-between gap-x-4">
            <DormTypeFilter content={ARTICLE_DORM_LIST} title={"기숙사"} />
            <BoardTypeFilter content={BOARD_TYPE_LIST} title={"게시판"} />
          </div>
          <TitleInput
            essential={true}
            numberOfCharacters={20}
            label={"제목"}
            placeholder={"제목을 입력해주세요."}
            pastTitle={postData.title}
          />
          <ContentInput
            essential={true}
            numberOfCharacters={300}
            label={"내용"}
            placeholder={"내용을 입력해주세요."}
            pastContent={postData.content}
          />
          <ImageInput
            usage={"edit"}
            fileList={fileList}
            imgUrlList={imgUrlList}
            setFileList={setFileList}
            setImgUrlList={setImgUrlList}></ImageInput>
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
export default Edit;
