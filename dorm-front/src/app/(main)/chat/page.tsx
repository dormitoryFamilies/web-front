import type { SVGProps } from "react";
import * as React from "react";
const Chat = () => {
  return (
    <>
      <div className={""}>
        <div className={"py-3 px-5 border-b-[1px] border-gray1"}>
          <div className={"flex justify-between"}>
            <div className={"text-h3 font-semibold"}>팔로잉</div>
            <button className={"flex items-center gap-x-1 home-button"}>
              전체보기
              <MoveIcon />
            </button>
          </div>

          {/*팔로우*/}
          <div className={"pt-[12px] flex flex-col gap-y-3"}>
            <div className={"flex gap-x-3"}>
              <div className={"flex flex-col gap-y-1 justify-center items-center"}>
                <ProfileIcon />
                <div className={"text-h6 text-gray3"}>닉네임</div>
              </div>
              <div className={"flex flex-col gap-y-1 justify-center items-center"}>
                <ProfileIcon />
                <div className={"text-h6 text-gray3"}>닉네임</div>
              </div>
              <div className={"flex flex-col gap-y-1 justify-center items-center"}>
                <ProfileIcon />
                <div className={"text-h6 text-gray3"}>닉네임</div>
              </div>
              <div className={"flex flex-col gap-y-1 justify-center items-center"}>
                <ProfileIcon />
                <div className={"text-h6 text-gray3"}>닉네임</div>
              </div>
            </div>
          </div>
        </div>

        {/*채팅 목록*/}
        <div className={"px-5 pt-2 flex flex-col gap-y-5"}>
          <div className={"text-h3 font-semibold py-3"}>채팅목록</div>
          <div className={"flex justify-between"}>
            <div className={"flex gap-x-3"}>
              <SecondProfileIcon />
              <div className={"flex flex-col gap-y-1"}>
                <div className={"text-h4 font-semibold"}>닉네임</div>
                <div className={"text-h5 text-gray5"}>양진재 1층에서 만날까요?</div>
              </div>
            </div>
            <div className={"flex flex-col items-end gap-y-1"}>
              <div className={"text-gray3 text-h6"}>오후 18:00</div>
              <div className={"rounded-full bg-primary w-fit px-2 text-white text-h4"}>1</div>
            </div>
          </div>
          <div className={"flex justify-between"}>
            <div className={"flex gap-x-3"}>
              <SecondProfileIcon />
              <div className={"flex flex-col gap-y-1"}>
                <div className={"text-h4 font-semibold"}>닉네임</div>
                <div className={"text-h5 text-gray5"}>양진재 1층에서 만날까요?</div>
              </div>
            </div>
            <div className={"flex flex-col items-end gap-y-1"}>
              <div className={"text-gray3 text-h6"}>오후 18:00</div>
              <div className={"rounded-full bg-primary w-fit px-2 text-white text-h4"}>1</div>
            </div>
          </div>
          <div className={"flex justify-between"}>
            <div className={"flex gap-x-3"}>
              <SecondProfileIcon />
              <div className={"flex flex-col gap-y-1"}>
                <div className={"text-h4 font-semibold"}>닉네임</div>
                <div className={"text-h5 text-gray5"}>양진재 1층에서 만날까요?</div>
              </div>
            </div>
            <div className={"flex flex-col items-end gap-y-1"}>
              <div className={"text-gray3 text-h6"}>오후 18:00</div>
              <div className={"rounded-full bg-primary w-fit px-2 text-white text-h4"}>1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#FF7E8D"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.171 6.14H1.313M11.701 6.14l-4-5M8.606 9.803l3.095-3.663"
    />
    <path fill="#FF7E8D" d="M7.191 10.96a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0" />
  </svg>
);

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={48}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#E4E5E7"
        d="M24.507 48c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24"
      />
      <path
        fill="#191919"
        d="M24.507 8.76c2.6 0 4.72 2.12 4.72 4.72s-2.12 4.72-4.72 4.72-4.72-2.12-4.72-4.72 2.12-4.72 4.72-4.72m0-3c-4.26 0-7.72 3.46-7.72 7.72s3.46 7.72 7.72 7.72 7.72-3.46 7.72-7.72-3.46-7.72-7.72-7.72M39.647 35.14c-.48 0-.96-.24-1.26-.68-3.1-4.68-8.28-7.46-13.88-7.46s-10.78 2.8-13.88 7.46c-.46.7-1.38.88-2.08.42a1.49 1.49 0 0 1-.42-2.08c3.66-5.52 9.78-8.82 16.38-8.82s12.74 3.3 16.38 8.82c.46.7.26 1.62-.42 2.08-.26.16-.54.24-.82.24z"
      />
      <path
        fill="#E70050"
        d="M31.627 33.86c-.86 0-1.56.7-1.56 1.56s.7 1.56 1.56 1.56 1.56-.7 1.56-1.56-.7-1.56-1.56-1.56"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.507 0h48v48h-48z" />
      </clipPath>
    </defs>
  </svg>
);
const SecondProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={49}
    fill="none"
    {...props}
  >
    <path
      fill="#E4E5E7"
      d="M24.007 48.5c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24"
    />
    <path
      fill="#191919"
      d="M24.007 9.26c2.6 0 4.72 2.12 4.72 4.72s-2.12 4.72-4.72 4.72-4.72-2.12-4.72-4.72 2.12-4.72 4.72-4.72m0-3c-4.26 0-7.72 3.46-7.72 7.72s3.46 7.72 7.72 7.72 7.72-3.46 7.72-7.72-3.46-7.72-7.72-7.72M39.147 35.64c-.48 0-.96-.24-1.26-.68-3.1-4.68-8.28-7.46-13.88-7.46s-10.78 2.8-13.88 7.46c-.46.7-1.38.88-2.08.42a1.49 1.49 0 0 1-.42-2.08c3.66-5.52 9.78-8.82 16.38-8.82s12.74 3.3 16.38 8.82c.46.7.26 1.62-.42 2.08-.26.16-.54.24-.82.24z"
    />
    <path
      fill="#E70050"
      d="M31.127 34.36c-.86 0-1.56.7-1.56 1.56s.7 1.56 1.56 1.56 1.56-.7 1.56-1.56-.7-1.56-1.56-1.56"
    />
  </svg>
);
