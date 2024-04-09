"use client";
import { useState } from "react";

import RoommateWishlistUserProfile from "@/components/mypage/RoommateWishlistUserProfile";

const RoommateWishlist = () => {
  const [name, setName] = useState<string>("닉네임닉네임닉");
  return (
    <div className={"grid grid-cols-2"}>
      <RoommateWishlistUserProfile name={"닉네임"} />
      <RoommateWishlistUserProfile name={"닉네임"} />
      <RoommateWishlistUserProfile name={"닉네임닉네임닉네임닉네임"} />
      <RoommateWishlistUserProfile name={"닉네임닉네임닉네임닉네임"} />
      <RoommateWishlistUserProfile name={"닉네임"} />
    </div>
  );
};
export default RoommateWishlist;
