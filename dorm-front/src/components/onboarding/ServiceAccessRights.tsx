import Image from 'next/image';

const ServiceAccessRights = () => {
  return (
    <div>
      <div>서비스 접근 권한 안내</div>
      <div>원활한 서비스 사용을 위해 다음 권한이 필요합니다.</div>

      <div className="flex gap-x-[22px] items-center">
        <div className={"p-5 rounded-full border-[1.5px] border-gray1 w-[70px] h-[70px]"}>
          <CameraIcon />
        </div>
        <div className="flex flex-col">
          <div>사진 / 카메라</div>
          <div>사진 업로드 및 저장 기능</div>
        </div>
      </div>

      <div className="flex gap-x-[22px] items-center">
        <div className={"p-5 rounded-full border-[1.5px] border-gray1 w-[70px] h-[70px]"}>
          <AlarmIcon />
        </div>
        <div className="flex flex-col">
          <div>알림</div>
          <div>푸시 알림 및 메시지 수신 안내</div>
        </div>
      </div>

    </div>
  )
}
export default ServiceAccessRights;

import * as React from 'react';

function CameraIcon(props) {
  return (
    <svg
      width={28}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_1199_2033)">
        <path
          d="M14 9.77a3.465 3.465 0 110 6.93 3.465 3.465 0 010-6.93zm0-1.75a5.213 5.213 0 00-5.215 5.214A5.213 5.213 0 0014 18.45a5.213 5.213 0 005.215-5.215A5.213 5.213 0 0014 8.02z"
          fill="#000"
        />
        <path
          d="M23.333 4.612A2.918 2.918 0 0126.25 7.53v10.897a2.918 2.918 0 01-2.917 2.916H4.667a2.918 2.918 0 01-2.917-2.916V7.529a2.918 2.918 0 012.917-2.917h18.666zm0-1.75H4.667A4.665 4.665 0 000 7.53v10.897a4.665 4.665 0 004.667 4.666h18.666A4.665 4.665 0 0028 18.426V7.529a4.665 4.665 0 00-4.667-4.667z"
          fill="#000"
        />
        <path
          d="M21.012 8.276a.933.933 0 100-1.867.933.933 0 000 1.867z"
          fill="#E70050"
        />
        <path
          d="M10.138.377H4.842a.881.881 0 00-.875.875c0 .479.396.875.875.875h5.296a.881.881 0 00.875-.875.881.881 0 00-.875-.875z"
          fill="#000"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1199_2033">
          <path fill="#fff" d="M0 0h28v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function AlarmIcon(props) {
  return (
    <svg
      width={21}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.77 9.713a7.633 7.633 0 0115.266 0V20.48H2.77V9.713z"
        stroke="#000"
        strokeWidth={1.6}
      />
      <rect y={19.713} width={20.491} height={1.6} rx={0.8} fill="#000" />
      <rect
        x={7.014}
        y={23.048}
        width={6.463}
        height={1.6}
        rx={0.8}
        fill="#000"
      />
      <rect
        x={4.641}
        y={17.048}
        width={3.861}
        height={1.537}
        rx={0.768}
        fill="#E70050"
      />
      <rect
        x={11.045}
        width={2.56}
        height={1.6}
        rx={0.8}
        transform="rotate(90 11.045 0)"
        fill="#000"
      />
    </svg>
  );
}
