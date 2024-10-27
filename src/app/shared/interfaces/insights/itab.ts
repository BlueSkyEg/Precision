import { IUser } from "./iuser";

export interface ITab {
  title: string;
  count: number;
  users: IUser[];
  searchTitle?: string;
}
