"use client";

import Image from "next/image";
import * as React from "react";
import { SVGProps, useEffect, useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

import ImageDeleteButton from "@/components/board/ImageDeleteButton";
import { fileListAtom, imgUrlListAtom, postDataState } from "@/recoil/board/atom";

interface Props {
  imgUrlList: string[];
  setImgUrlList: SetterOrUpdater<string[]>;
  fileList: File[];
  setFileList: SetterOrUpdater<File[]>;
}
const ImageInput = (props: Props) => {
  const { imgUrlList, setImgUrlList, fileList, setFileList } = props;
  const [postData, setPostData] = useRecoilState(postDataState);
  const imgRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 input의 onChange
  const saveImgFile = async () => {
    const files = imgRef.current.files;
    if (files) {
      const copyImgFile = [...imgUrlList];
      const copyFileList = [...fileList];

      // 이미지 미리 보기 코드
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          setImgUrlList((prevList) => [...prevList, reader.result as string]);
        };
      }

      // 이미지 업로드 코드
      for (let i = 0; i < files.length; i++) {
        setFileList((prevList) => [...prevList, files[i]]);
      }
    }
  };

  useEffect(() => {
    setPostData((prevData) => ({ ...prevData, imagesUrls: [...imgUrlList] }));
  }, [imgUrlList, setPostData]);

  return (
    <div>
      <div className={"flex flex-col"}>
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
            <div className={"flex justify-center items-center w-[80px] h-[80px] bg-gray0 rounded-[8px] mr-[4px]"}>
              <div className={"flex flex-col justify-center items-center"}>
                <CameraIcon />
              </div>
            </div>
          </label>
          <div className={"flex gap-x-1 items-center overflow-x-scroll"}>
            {imgUrlList.map((imgUrl, i) => (
              <div key={i} className={"relative pt-[6px] pr-[6px]"}>
                <ImageDeleteButton i={i} />
                <div className={"relative h-[80px] w-[80px] rounded-[8px] flex-shrink-0"}>
                  <Image src={imgUrl} alt={imgUrl} fill className={"object-cover rounded-[8px]"}></Image>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageInput;

const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={24} fill="none" {...props}>
    <g fill="#9E9FA1" clipPath="url(#a)">
      <path d="M14.5 9.769a3.465 3.465 0 1 1 0 6.93 3.465 3.465 0 0 1 0-6.93m0-1.75a5.213 5.213 0 0 0-5.215 5.215 5.213 5.213 0 0 0 5.215 5.215 5.213 5.213 0 0 0 5.215-5.215A5.213 5.213 0 0 0 14.5 8.019" />
      <path d="M23.833 4.613a2.92 2.92 0 0 1 2.917 2.916v10.897a2.92 2.92 0 0 1-2.917 2.917H5.167a2.92 2.92 0 0 1-2.917-2.917V7.529a2.92 2.92 0 0 1 2.917-2.916zm0-1.75H5.167A4.665 4.665 0 0 0 .5 7.529v10.897a4.665 4.665 0 0 0 4.667 4.667h18.666a4.665 4.665 0 0 0 4.667-4.667V7.529a4.665 4.665 0 0 0-4.667-4.666" />
      <path d="M21.512 8.276a.933.933 0 1 0 0-1.867.933.933 0 0 0 0 1.867M10.638.377H5.342a.88.88 0 0 0-.875.875c0 .479.396.875.875.875h5.296a.88.88 0 0 0 .875-.875.88.88 0 0 0-.875-.875" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h28v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
