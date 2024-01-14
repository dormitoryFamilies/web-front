'use client';

import { atom } from 'recoil';

//드롭다운 메뉴를 보이도록(or 보이지 않도록) 하는 state
export const DropDownClick = atom({
    key: 'DropDownClick',
    default: false,
});

//드롭다운 메뉴로 기숙사 선택시
export const selectedDormitory = atom({
    key: 'selectedDormitory',
    default: '양진재',
});

//
export const homeMenuFilterState = atom({
    key: 'homeMenuFilterState',
    default: 'breakfast',
});
