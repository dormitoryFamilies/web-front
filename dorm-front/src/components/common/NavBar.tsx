import Link from "next/link";
import React, { useState } from "react";

import { MENU_LIST } from "@/utils/nav";

export default function NavBar() {
  const [route, setRoute] = useState<string>("홈");
  return (
    <div className="fixed bottom-0 flex justify-center items-center">
      <div className="bg-white flex rounded-t-[32px] gap-x-4 py-3 px-5 items-center drop-shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        {MENU_LIST.map((menu) => {
          return (
            <Link
              href={menu.path}
              key={menu.id}
              onClick={() => setRoute(menu.name)}
              className="w-[54px] h-[52px] text-[12px] flex flex-col justify-center items-center">
              {route == menu.name ? <menu.ClickedIcon /> : <menu.UnClickedIcon />}
              <span className="text-h6 text-gray4">{menu.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
