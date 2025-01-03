import * as React from "react";

import PreferredLifestyleReviewer from "@/components/room-mate/PreferredLifestyleReviewer";

interface Props {
  memberId: number | undefined;
}

const MyLifeStyle = (props: Props) => {
  const { memberId } = props;
  return (
    <>
      <PreferredLifestyleReviewer memberId={memberId} usage={"mypage"} />
    </>
  );
};
export default MyLifeStyle;
