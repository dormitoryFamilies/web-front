import { BoardSortType, BoardStatusType } from "@/types/board/type";
import { DormitoryType } from "@/types/mypage/type";

export const dormitoryFilterContents: DormitoryType[] = ["기숙사", "본관", "양성재", "양진재"];
export const sortFilterContents: BoardSortType[] = ["createdAt", "popularity"];
export const statusFilterContents: BoardStatusType[] = ["전체", "모집중", "모집완료"];
