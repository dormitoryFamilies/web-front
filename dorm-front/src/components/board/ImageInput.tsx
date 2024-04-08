"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { postDataState } from "@/recoil/board/atom";
import Image from "next/image";

const ImageInput = () => {
  const [postData, setPostData] = useRecoilState(postDataState);
  const [imgUrlList, setImgUrlList] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  //이미지 업로드 input의 onChange
  const saveImgFile = async () => {
    const files = imgRef.current.files;
    const copyImgFile = [...imgUrlList];
    const copyFileList = [...fileList];

    // 이미지 미리 보기 코드
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        copyImgFile.push(reader.result);
        setImgUrlList(copyImgFile);
      };
    }

    // 이미지 업로드 코드
    for (let i = 0; i < files.length; i++) {
      copyFileList.push(files[i]);
      setFileList(copyFileList);
    }
  };

  useEffect(() => {
    setPostData((prevData) => ({ ...prevData, imagesUrls: [...imgUrlList] }));
  }, [imgUrlList]);

  useEffect(() => {
    console.log("postData.imagesUrls",postData.imagesUrls);
  }, [postData.imagesUrls]);


  return (
    <div>
      <div className={"flex flex-col gap-y-1"}>
        <span className={"text-lg font-semibold"}>파일 업로드</span>
        <input
          type={"file"}
          accept={"image/*"}
          id="image"
          name="image"
          onChange={saveImgFile}
          multiple
          required
          ref={imgRef}
          style={{ display: "none" }}></input>
        <div className={"flex items-center mt-2"}>
          <label id={"image"} htmlFor="image">
            <div
              className={
                "text-white p-2 w-[40px] h-[40px] bg-black rounded-full cursor-pointer mr-2 hover:scale-105 transition hover:opacity-70"
              }>
              +
            </div>
          </label>

          <div className={"flex gap-x-2 rounded-2xl items-center overflow-x-scroll"}>
            {imgUrlList.map((imgUrl, i) => (
              <Image key={i} src={imgUrl} alt={imgUrl} height={80} width={80}></Image>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageInput;
