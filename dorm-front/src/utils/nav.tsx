import * as React from 'react';
import { MenuList } from '@/types/global';

export const MENU_LIST: MenuList[] = [
  { id: 1, Icon: HomeIcon, name: '홈', path: '/home' },
  { id: 2, Icon: BoardIcon, name: '게시판', path: '/board' },
  { id: 3, Icon: ChatIcon, name: '채팅', path: '/chat' },
  { id: 4, Icon: RoomMateIcon, name: '룸메이트', path: '/room-mate' },
  { id: 5, Icon: MyPageIcon, name: '마이페이지', path: '/mypage' },
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.344 5.526c-.812 0-1.624.277-2.284.831l-7.136 5.965a3.59 3.59 0 00-1.285 2.745v8.163a3.572 3.572 0 003.568 3.577H25.48c1.972 0 3.569-1.6 3.569-3.577v-8.163a3.577 3.577 0 00-1.285-2.745l-7.137-5.965a3.544 3.544 0 00-2.283-.831z"
        fill="#FFE8DE"
      />
      <path
        d="M18.344 5.526c-.812 0-1.624.277-2.284.831l-7.136 5.965a3.59 3.59 0 00-1.285 2.745v8.163a3.572 3.572 0 003.568 3.577H25.48c1.972 0 3.569-1.6 3.569-3.577v-8.163a3.577 3.577 0 00-1.285-2.745l-7.137-5.965a3.544 3.544 0 00-2.283-.831z"
        fill="#FFE8DE"
      />
      <g clipPath="url(#prefix__clip0_922_3601)">
        <path
          d="M15.951 5.71c.58 0 1.15.21 1.6.58l8 6.67c.57.48.9 1.18.9 1.92v9.13c0 1.38-1.12 2.5-2.5 2.5h-16c-1.38 0-2.5-1.12-2.5-2.5v-9.13c0-.74.33-1.44.9-1.92l8-6.67c.45-.37 1.02-.58 1.6-.58zm0-1.5c-.91 0-1.82.31-2.56.93l-8 6.66c-.91.76-1.44 1.89-1.44 3.07V24c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-9.13c0-1.19-.53-2.31-1.44-3.07l-8-6.67c-.74-.62-1.65-.93-2.56-.93v.01z"
          fill="#000"
        />
        <path d="M20.632 17.12a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#E70050" />
        <path
          d="M18.451 19.5v7h-5v-7h5zm.5-1.5h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z"
          fill="#000"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_3601">
          <path fill="#fff" transform="translate(3.952 4)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
function BoardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_922_3611)">
        <path d="M19.57 17.5c-.43 0-.77.34-.77.77s.34.77.77.77.77-.34.77-.77-.34-.77-.77-.77z" fill="#BEBEBE" />
        <path
          d="M22.13 5.6c1.49 0 2.7 1.21 2.7 2.7v15.4c0 1.49-1.21 2.7-2.7 2.7H10.87c-1.49 0-2.7-1.21-2.7-2.7V8.3c0-1.49 1.21-2.7 2.7-2.7h11.26zm0-1.6H10.87c-2.37 0-4.3 1.93-4.3 4.3v15.4a4.3 4.3 0 004.3 4.3h11.26a4.3 4.3 0 004.3-4.3V8.3a4.3 4.3 0 00-4.3-4.3z"
          fill="#9E9FA1"
        />
        <path
          d="M11.09 9.95h7.48M11.09 13.27h7.48M11.09 18.35h5.15"
          stroke="#BEBEBE"
          strokeWidth={1.6}
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_3611">
          <path fill="#fff" transform="translate(6.57 4)" d="M0 0h19.86v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_922_3620)">
        <path
          d="M24.5 6.917c1.38 0 2.5 1.221 2.5 2.726v8.721c0 1.505-1.12 2.726-2.5 2.726h-4.13c-.48 0-.93.25-1.21.665L16.5 24.7l-2.66-2.946a1.443 1.443 0 00-1.21-.665H8.5c-1.38 0-2.5-1.221-2.5-2.726V9.643c0-1.505 1.12-2.726 2.5-2.726h16zm0-1.635h-16c-2.21 0-4 1.952-4 4.36v8.722c0 2.41 1.79 4.361 4 4.361h4.13l3.06 3.546c.2.294.5.447.81.447.31 0 .61-.153.81-.447l3.06-3.546h4.13c2.21 0 4-1.951 4-4.36V9.642c0-2.41-1.79-4.36-4-4.36z"
          fill="#9E9FA1"
        />
        <path
          d="M11.25 14.5a1 1 0 100-2 1 1 0 000 2zM16.5 14.5a1 1 0 100-2 1 1 0 000 2zM21.75 14.5a1 1 0 100-2 1 1 0 000 2z"
          fill="#BEBEBE"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_3620">
          <path fill="#fff" transform="translate(4.5 4)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
function RoomMateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_922_3628)">
        <path
          d="M13.49 27.344a1.145 1.145 0 100-2.289 1.145 1.145 0 000 2.29zM20.037 6.945a1.145 1.145 0 100-2.29 1.145 1.145 0 000 2.29z"
          fill="#BEBEBE"
        />
        <path
          d="M6.3 15.897c0-5.575 4.614-10.096 10.303-10.096M4.584 15.897l1.717 1.27 1.717-1.27M16.603 26.2c5.575 0 10.096-4.614 10.096-10.303"
          stroke="#9E9FA1"
          strokeWidth={1.625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.983 15.897l1.717-1.27 1.717 1.27"
          stroke="#9E9FA1"
          strokeWidth={1.625}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.603 14.958a2.29 2.29 0 100-4.579 2.29 2.29 0 000 4.58zM16.603 17.087a4.316 4.316 0 013.972 2.61h-7.933a4.316 4.316 0 013.973-2.61m-.012-1.717a6.052 6.052 0 00-5.872 4.602c-.172.721.366 1.431 1.11 1.431h9.501c.744 0 1.294-.71 1.11-1.43a6.032 6.032 0 00-5.872-4.603h.023z"
          fill="#9E9FA1"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_3628">
          <path fill="#fff" transform="translate(3.5 3)" d="M0 0h26v26H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
function MyPageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={33} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0_922_3643)">
        <path
          d="M22.809 26.944H9.636a3.137 3.137 0 01-2.627-1.425 3.059 3.059 0 01-.25-2.914c1.628-3.71 5.523-6.105 9.926-6.105 4.098 0 7.882 2.173 9.648 5.531a.74.74 0 01-.314 1 .737.737 0 01-1-.315c-1.507-2.877-4.782-4.736-8.334-4.736-3.811 0-7.179 2.044-8.566 5.217-.222.49-.167 1.045.13 1.508.305.472.832.758 1.387.758h13.173c.407 0 .74.334.74.74 0 .407-.333.74-.74.74zM16.731 6.453a3.735 3.735 0 013.728 3.728 3.735 3.735 0 01-3.728 3.728 3.735 3.735 0 01-3.728-3.728 3.735 3.735 0 013.728-3.728zm0-1.48a5.207 5.207 0 00-5.208 5.208 5.207 5.207 0 005.208 5.208 5.207 5.207 0 005.208-5.208 5.207 5.207 0 00-5.208-5.208z"
          fill="#9E9FA1"
        />
        <path
          d="M25.677 25.38a.825.825 0 00-.824.823c0 .454.37.824.824.824.453 0 .823-.37.823-.824a.825.825 0 00-.823-.823z"
          fill="#BEBEBE"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_922_3643">
          <path fill="#fff" transform="translate(6.5 4.973)" d="M0 0h20v22.054H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
