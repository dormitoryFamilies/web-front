import * as React from "react";

import Button from "@/components/common/Button";

interface Props {
  title: string;
  content: string;
  wishCount: number;
  commentCount: number;
  tags: string;
  // images?: ImageType[];
}
const PostDetailContent = (props: Props) => {
  const { title, content, tags, wishCount, commentCount } = props;

  const parseTags = (tagsString: string) => {
    // 문자열을 #을 기준으로 나눈 후, 빈 문자열을 제외한 나머지를 필터링
    return tagsString?.split("#").filter((tag) => tag !== "");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="text-h3 font-bold">{title}</div>
        <div className="font-normal">{content}</div>
      </div>
      <div className="flex gap-x-[18px]">
        {/*{images.map((image,index) => {*/}
        {/*  return (*/}
        {/*    <div key={index} className={"relative rounded-[8px] w-[100px] h-[100px] overflow-hidden"}>*/}
        {/*      <Image alt={image.imageName} src={image.s3Url} fill className={"object-cover"} />*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </div>
      <div className="flex gap-x-1">
        {parseTags(tags)?.map((tag, index) => {
          return (
            <Button className={"tag"} key={index}>
              #{tag}
            </Button>
          );
        })}
      </div>
      <div className={"flex items-center text-h6 text-gray5"}>
        <span>관심</span>
        <span className={"ml-[3px]"}>{wishCount}</span>
        <div className={"h-[2px] w-[2px] bg-gray2 rounded-full mx-1"} />
        <span>댓글</span>
        <span className={"ml-[3px]"}>{commentCount}</span>
      </div>
    </div>
  );
};
export default PostDetailContent;
