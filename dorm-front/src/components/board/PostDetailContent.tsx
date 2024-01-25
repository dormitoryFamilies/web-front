import Image from "next/image";
import Tag from '@/components/board/Tag';
import * as React from 'react';
import Button from '@/components/common/Button';
import { ImageType } from '@/types/board/type';

interface Props {
  title: string;
  content: string;
  tags: string[];
  images: ImageType[];
}
const PostDetailContent = (props: Props) => {
  const { title, content, tags, images } = props;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="text-h3 font-bold">{title}</div>
        <div className="font-normal">{content}</div>
      </div>
      <div className="flex gap-x-[18px]">
        {images.map((image,index) => {
          return (
            <div key={index} className={"relative rounded-[8px] w-[100px] h-[100px] overflow-hidden"}>
              <Image alt={image.imageName} src={image.s3Url} fill className={"object-cover"} />
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-1">
        {tags.map((tag, index) => {
          return (
            <Button className={"tag"} key={index}>
              #{tag}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
export default PostDetailContent;
