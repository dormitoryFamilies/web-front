import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import useUnreadChattingTotalCount from "@/lib/hooks/useUnreadChattingTotalCount";
import { MENU_LIST } from "@/utils/nav";

export default function NavBar() {
  const [route, setRoute] = useState<string>("홈");
  const paramsName = usePathname();
  const { unreadChattingTotalCount } = useUnreadChattingTotalCount();

  return (
    <div className="fixed bottom-0 flex justify-center items-center w-full">
      <div className="bg-white w-full flex rounded-t-[32px] gap-x-4 py-3 px-5 items-center drop-shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        {MENU_LIST.map((menu) => {
          return (
            <Link
              href={menu.path}
              key={menu.id}
              onClick={() => setRoute(menu.name)}
              className="relative w-[54px] h-[52px] text-[12px] flex flex-col justify-center items-center">
              {"/" + paramsName.split("/")[1] === menu.path ? <menu.ClickedIcon /> : <menu.UnClickedIcon />}
              {menu.name === "채팅" && unreadChattingTotalCount?.data.totalCount !== 0 ? (
                <div className={"absolute bg-primary rounded-full px-1 text-white text-[10px] top-0 right-1"}>
                  {unreadChattingTotalCount?.data.totalCount}
                </div>
              ) : null}
              <span className="text-h6 text-gray4">{menu.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
