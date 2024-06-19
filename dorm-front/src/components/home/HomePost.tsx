'use client';

import { ALL_POST } from '@/utils/board/allPost';

const HomePost = () => {
  return (
    <div className="flex flex-col mt-3 px-4 py-[11.5px] rounded-[32px] border border-secondary">
      {/*{ALL_POST.map((post, index) => {*/}
      {/*  return index != ALL_POST.length - 1 ? (*/}
      {/*    <div className="relative flex items-center gap-x-2 border-b border-gray1 py-[5.5px]">*/}
      {/*      <div className="bg-secondary rounded-full px-2 text-h5">{post.tag}</div>*/}
      {/*      <div className="truncate text-h5">{post.title}</div>*/}
      {/*      <div className="absolute right-0 text-h6 text-gray3">{post.date}</div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div>*/}
      {/*      <div className="relative flex items-center gap-x-2 py-[5.5px]">*/}
      {/*        <div className="bg-secondary rounded-full px-2 text-h5">{post.tag}</div>*/}
      {/*        <div className="truncate text-h5">{post.title}</div>*/}
      {/*        <div className="absolute right-0 text-h6 text-gray3">{post.date}</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
};
export default HomePost;
