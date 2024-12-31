import { IUser } from "./user-model";

export interface ITab {
  title: string;
  count: number;
  users: IUser[];
  
  searchTitle?: string;
}
