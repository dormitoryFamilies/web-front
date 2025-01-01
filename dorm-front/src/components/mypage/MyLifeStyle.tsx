import type { SVGProps } from "react";
import * as React from "react";

import PreferredLifestyleReviewer from "@/components/room-mate/PreferredLifestyleReviewer";

interface Props {
  memberId: number | undefined;
}

const MyLifeStyle = (props: Props) => {
  const { memberId } = props;
  return (
    <>
      <div className={"flex flex-col gap-y-3 bg-gray0 p-4 rounded-[24px]"}>
        {/*나의 라이프 스타일*/}
        <PreferredLifestyleReviewer memberId={memberId} usage={"mypage"}/>
      </div>
    </>
  );
};
export default MyLifeStyle;
