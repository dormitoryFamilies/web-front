import { AxiosHeaders } from "axios";

export interface MenuByDayType {
  일요일?: string[];
  월요일: string[];
  화요일: string[];
  수요일: string[];
  목요일: string[];
  금요일: string[];
  토요일?: string[];
}
export type DormType = "본관" | "양진재" | "양성재";

export interface MealMenuAxiosResponseType {
  data: MealMenuResponseType;
  headers: AxiosHeaders;
}
export interface MealMenuResponseType {
  code: number;
  data: MealMenuType[];
}
export interface MealMenuType {
  day: string;
  weekday: string;
  morning: MealType;
  lunch: MealType;
  dinner: MealType;
}

export interface MealType {
  menu: string;
  energy: string;
  protein: string;
}
