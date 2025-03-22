"use client";
import { useEffect } from "react";

interface Props {
  menu: string | undefined;
  energy: string | undefined;
  protein: string | undefined;
}

const HomeMenu = (props: Props) => {
  const { menu, energy, protein } = props;

  useEffect(() => {
    console.log("energy", energy);
  }, [energy]);

  return (
    <>
      {/*TODO: 데이터 추가 */}
      <div className="flex flex-col gap-y-3 items-center text-h4">
        {menu?.split(" ") &&
          menu?.split(" ").map((menu) => {
            return <div key={menu}>{menu}</div>;
          })}
      </div>
      <div className="flex text-gray4 text-h5 gap-x-5">
        <div>총 칼로리 {energy}</div>
      </div>
    </>
  );
};
export default HomeMenu;

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.007 1.5c3.308 0 6 2.692 6 6 0 3.307-2.692 6-6 6-3.307 0-6-2.693-6-6 0-3.308 2.693-6 6-6zm0-1.5c-4.14 0-7.5 3.36-7.5 7.5 0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5z"
        fill="#9E9FA1"
      />
      <path
        d="M10.82 5.19a.738.738 0 00-1.043-.068l-1.02.9V3.157a.752.752 0 00-.75-.75.752.752 0 00-.75.75v4.5c0 .045.015.083.023.128.007.052.015.105.03.15.007.03.03.045.045.075.03.052.045.112.09.157.15.165.352.248.562.24.09 0 .18-.015.27-.052.038-.015.06-.038.09-.053.038-.022.083-.037.12-.067l2.265-2.003a.738.738 0 00.068-1.042z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
