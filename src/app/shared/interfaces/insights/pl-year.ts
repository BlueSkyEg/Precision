export interface PlYear {
  typeName:string;
  accounts: Account[];
  typeSums: number[];
}
export interface Account {
  accountName:string,
  accountSums: number[];
}
