export interface PsYear {
  wrapperName: string
  categories: Category[]
  totals: number[]
}
export interface Category {
  typeName: string
  accounts: Account[]
  typeSums: number[]
}

export interface Account {
  accountName: string
  accountSums: number[]
}
