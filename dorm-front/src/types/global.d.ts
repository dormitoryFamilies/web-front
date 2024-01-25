//Navbar 리스트 타입
export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

// 기숙사 리스트 타입
export interface DormList {
  id: number;
  name: string;
}

// 게시글 타입
export interface PostList {
  tag: string;
  title: string;
  date: string;
}

//식단 메뉴
export interface FoodMenuList {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}
