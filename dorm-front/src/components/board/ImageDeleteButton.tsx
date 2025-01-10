import { SVGProps } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { deleteS3UrlListAtom, fileListAtom, imgUrlListAtom, postDataState } from "@/recoil/board/atom";

interface Props {
  usage: "create" | "edit";
  i: number;
}

const ImageDeleteButton = (props: Props) => {
  const { usage, i } = props;
  const [imgUrlList, setImgUrlList] = useRecoilState<string[]>(imgUrlListAtom); //이미지 URL string
  const [fileList, setFileList] = useRecoilState<File[]>(fileListAtom); //이미지 file
  const [postData, setPostData] = useRecoilState(postDataState);
  const [deleteS3UrlList, setDeleteS3UrlList] = useRecoilState(deleteS3UrlListAtom);

  /**
   * 글을 새로 생성할 때(usage==create), 선택된 imageUrl 을 제외하고 남은 imageUrl 로 새로운 리스트를 구성합니다.
   */
  const deleteCreateImageUrl = () => {
    const copyImgUrlList = [...imgUrlList];
    const copyFileList = [...fileList];
    setImgUrlList(copyImgUrlList.filter((imageUrl) => imageUrl != copyImgUrlList[i]));
    setFileList(copyFileList.filter((file) => file != copyFileList[i]));
  };

  /**
   * 글을 수정할 때(usage==edit), 선택된 imageUrl 을 제외하고 남은 imageUrl 로 새로운 리스트를 구성합니다.
   */
  const deleteEditImageUrl = () => {
    const copyImgUrlList = [...imgUrlList];
    const copyFileList = [...fileList];
    const copyPostImageUrlList = [...postData.imagesUrls];
    if (postData.imagesUrls.length !== 0 && copyPostImageUrlList[i] !== undefined) {
      setDeleteS3UrlList((prevList) => [...prevList, copyPostImageUrlList[i]]);
      setPostData((prevState) => ({
        ...prevState,
        imagesUrls: copyPostImageUrlList.filter((imageUrl) => imageUrl != copyImgUrlList[i]),
      }));
    }
    setImgUrlList(copyImgUrlList.filter((imageUrl) => imageUrl != copyImgUrlList[i]));
    setFileList(copyFileList.filter((file) => file != copyFileList[i]));
  };

  return (
    <button
      type={"button"} //form 전달 막기
      onClick={() => {
        if (usage === "create") {
          deleteCreateImageUrl();
        } else {
          deleteEditImageUrl();
        }
      }}
      className={"absolute bg-gray4 rounded-full p-1 top-0 right-0 z-10"}>
      <DeleteIcon />
    </button>
  );
};
export default ImageDeleteButton;

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none" {...props}>
    <path fill="#9E9FA1" d="M.5 0h7.778v7.778H.5z" />
    <path
      fill="#fff"
      d="M.854 7.189a.504.504 0 0 1 0-.707L6.982.354a.504.504 0 0 1 .707 0 .504.504 0 0 1 0 .707L1.56 7.189a.504.504 0 0 1-.707 0"
    />
    <path
      fill="#fff"
      d="M5.568 5.775.854 1.06a.504.504 0 0 1 0-.707.504.504 0 0 1 .707 0l4.714 4.714a.504.504 0 0 1 0 .707.504.504 0 0 1-.707 0M6.864 7.307a.667.667 0 1 0 .943-.943.667.667 0 0 0-.943.943"
    />
  </svg>
);
