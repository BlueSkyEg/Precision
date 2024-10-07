export interface IAuthedUser {
  id: string;
  fullName: string;
  emailAddress: string;
  profileImg: string | null;
  accessToken: string;
  accessRole: string; 
}
