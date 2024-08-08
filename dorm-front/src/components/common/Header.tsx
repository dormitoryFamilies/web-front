import { useRouter } from "next/navigation";
import React, { Dispatch, ReactNode, SetStateAction, SVGProps } from "react";
import { useRecoilState } from "recoil";

import DropDownDormModal from "@/components/common/DropDownDormModal";
import { DropDownClick, selectedDormitory } from "@/recoil/atom";
import { HeaderType } from "@/types/global";

interface Props {
  headerType?: HeaderType;
  title?: string;
  rightElement?: ReactNode;
  onBack?: () => void;
  setSearchValue?: Dispatch<SetStateAction<string>>;
}

const Header = (props: Props) => {
  const { headerType = "static", title, rightElement, onBack, setSearchValue } = props;
  //드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
  const [isDropDownClick, setIsDropDownClick] = useRecoilState<boolean>(DropDownClick);
  const router = useRouter();

  //드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 함수
  const dropDownOnClick = () => {
    setIsDropDownClick(!isDropDownClick);
  };
  // 선택된 기숙사 state
  const [selectedDorm, setSelectedDorm] = useRecoilState<string>(selectedDormitory);

  const renderHeader = (headerType: HeaderType) => {
    switch (headerType) {
      case "static":
        return (
          <>
            <Logo className="absolute left-5" />
            <div
              className="absolute left-50 right-50 flex items-center gap-x-1"
              onClick={() => {
                dropDownOnClick();
              }}>
              <div className="text-h2 font-bold z-20">{selectedDorm}</div>
              {isDropDownClick ? <DropDownOnIcon /> : <DropDownOffIcon />}
            </div>
            <AlarmIcon className="absolute right-5" />
          </>
        );
      case "chattingHome":
        return (
          <>
            <Logo />
            <div className="text-h2 font-bold">{title}</div>
            {rightElement ? rightElement : <div className={"w-[40px] h-[40px]"} />}
          </>
        );
      case "dynamic":
        return (
          <>
            <PrevArrow
              onClick={() => {
                onBack ? onBack() : router.back();
              }}
            />
            <h1 className="text-black text-h2 font-semibold bg-white">{title}</h1>
            {rightElement ? rightElement : <div className={"w-[40px] h-[40px]"} />}
          </>
        );
      case "search":
        return (
          <>
            <PrevArrow
              onClick={() => {
                onBack ? onBack() : router.back();
              }}
            />
            <div className={"bg-gray0 rounded-full w-full py-2 px-4 placeholder:text-gray3"}>
              <input
                placeholder={"검색어를 입력해주세요."}
                className={"bg-gray0 w-full outline-none"}
                onChange={(e) => {
                  if (setSearchValue) {
                    setSearchValue(e.target.value);
                  }
                }}
              />
            </div>
          </>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <header
        className={
          headerType === "static"
            ? "h-[52px] fixed top-0 bg-white flex items-center justify-evenly w-full"
            : "px-5 h-[52px] fixed top-0 bg-white flex items-center justify-between w-full"
        }>
        {renderHeader(headerType)}
      </header>
      {isDropDownClick ? <DropDownDormModal /> : null}
    </div>
  );
};

export default Header;

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={55} height={52} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_922_2352)">
        <path
          d="M35.772 42c-6.787 0-12.308-5.521-12.308-12.309 0-6.787 5.521-12.308 12.308-12.308 6.788 0 12.31 5.521 12.31 12.308a12.25 12.25 0 01-1.653 6.162l.823 3.564a1.826 1.826 0 01-2.314 2.156l-3.362-1.029A12.279 12.279 0 0135.771 42h.001zm0-20.967c-4.774 0-8.657 3.884-8.657 8.657s3.885 8.657 8.657 8.657a8.626 8.626 0 004.604-1.327c.45-.282 1-.356 1.507-.2l1.1.335-.282-1.217a1.827 1.827 0 01.263-1.428 8.613 8.613 0 001.464-4.819c0-4.774-3.884-8.657-8.657-8.657h.001z"
          fill="#FFA2B8"
        />
        <path
          d="M12.84 13.652c.055 0 .11 0 .166.005l8.062.506c2.78.174 5.344 1.283 7.22 3.122 1.829 1.793 2.837 4.15 2.837 6.635 0 2.486-1.007 4.844-2.836 6.635-1.876 1.84-4.44 2.949-7.221 3.123l-8.062.506a2.547 2.547 0 01-.168.005c-1.485 0-2.837-1.295-2.837-2.718V16.37c0-1.423 1.352-2.718 2.837-2.718M12.84 10C9.32 10 6.35 12.946 6.35 16.37v15.102c0 3.424 2.97 6.37 6.49 6.37a6.1 6.1 0 00.395-.012l8.062-.507c7.488-.47 13.48-6.153 13.48-13.401 0-7.25-5.992-12.934-13.48-13.404l-8.062-.506a6.172 6.172 0 00-.396-.012z"
          fill="#E70050"
        />
        <mask
          id="prefix__a"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={19}
          y={27}
          width={17}
          height={12}>
          <path
            d="M35.687 34.851c-2.436 2.794-6.168 3.938-9.81 3.386-3.888-.587-8.871-1.282-6.034-5.882 2.683-4.347 13.96-8.392 15.844 2.495-2.436 2.794-1.883-10.887 0 0v.001z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#prefix__a)">
          <path
            d="M12.84 13.652c.055 0 .11 0 .166.005l8.062.506c2.78.174 5.344 1.283 7.22 3.122 1.829 1.793 2.837 4.15 2.837 6.635 0 2.486-1.007 4.844-2.836 6.635-1.876 1.84-4.44 2.949-7.221 3.123l-8.062.506a2.547 2.547 0 01-.168.005c-1.485 0-2.837-1.295-2.837-2.718V16.37c0-1.423 1.352-2.718 2.837-2.718M12.84 10C9.32 10 6.35 12.946 6.35 16.37v15.102c0 3.424 2.97 6.37 6.49 6.37a6.1 6.1 0 00.395-.012l8.062-.507c7.488-.47 13.48-6.153 13.48-13.401 0-7.25-5.992-12.934-13.48-13.404l-8.062-.506a6.172 6.172 0 00-.396-.012z"
            fill="#E70050"
          />
          <path
            d="M35.772 42c-6.787 0-12.308-5.521-12.308-12.309 0-6.787 5.521-12.308 12.308-12.308 6.788 0 12.31 5.521 12.31 12.308a12.25 12.25 0 01-1.653 6.162l.823 3.564a1.826 1.826 0 01-2.314 2.156l-3.362-1.029A12.279 12.279 0 0135.771 42h.001zm0-20.967c-4.774 0-8.657 3.884-8.657 8.657s3.885 8.657 8.657 8.657a8.626 8.626 0 004.604-1.327c.45-.282 1-.356 1.507-.2l1.1.335-.282-1.217a1.827 1.827 0 01.263-1.428 8.613 8.613 0 001.464-4.819c0-4.774-3.884-8.657-8.657-8.657h.001z"
            fill="#FFA2B8"
          />
        </g>
        <path
          d="M14.075 24.176a1.522 1.522 0 100-3.043 1.522 1.522 0 000 3.043zM19.988 24.176a1.522 1.522 0 100-3.043 1.522 1.522 0 000 3.043z"
          fill="#E70050"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_2352">
          <path fill="#fff" transform="translate(6.35 10)" d="M0 0h41.732v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function AlarmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.532 17.389a7.633 7.633 0 0115.266 0v10.767H12.532V17.389z" stroke="#191919" strokeWidth={1.6} />
      <rect x={9.762} y={27.389} width={20.491} height={1.6} rx={0.8} fill="#191919" />
      <rect x={16.776} y={30.724} width={6.463} height={1.6} rx={0.8} fill="#191919" />
      <rect x={14.403} y={24.724} width={3.861} height={1.537} rx={0.768} fill="#E70050" />
      <rect
        x={20.807}
        y={7.676}
        width={2.56}
        height={1.6}
        rx={0.8}
        transform="rotate(90 20.807 7.676)"
        fill="#191919"
      />
    </svg>
  );
}
function DropDownOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={10} height={6} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.509 5.293L.923 1.707C.293 1.077.74 0 1.63 0h7.172c.89 0 1.337 1.077.707 1.707L5.923 5.293a1 1 0 01-1.414 0z"
        fill="#191919"
      />
    </svg>
  );
}

function DropDownOnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={10} height={6} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.916.707l3.586 3.586c.63.63.184 1.707-.707 1.707H1.623C.733 6 .286 4.923.916 4.293L4.502.707a1 1 0 011.414 0z"
        fill="#191919"
      />
    </svg>
  );
}

const PrevArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none" {...props}>
    <path
      fill="#727375"
      fillRule="evenodd"
      d="m17.74 10.212-7.062 9.383a.81.81 0 0 0-.158.71c.03.122.089.238.173.336l5.459 6.866a.818.818 0 1 0 1.28-1.018l-4.421-5.562h16.688a.818.818 0 1 0 0-1.637H12.955l6.092-8.094a.818.818 0 0 0-1.307-.984m.671 19.903c.488 0 .884-.421.884-.94 0-.52-.396-.94-.884-.94s-.884.42-.884.94c0 .519.396.94.884.94"
      clipRule="evenodd"
    />
  </svg>
);
