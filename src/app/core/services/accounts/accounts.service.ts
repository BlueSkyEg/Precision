import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsDictionary: { [id: string]: string } = {};

  // Method to populate accounts dictionary
  setAccounts(accounts: { id: string; fullName: string }[]): void {
    this.accountsDictionary = accounts.reduce((dict, account) => {
      dict[account.id] = account.fullName;
      return dict;
    }, {} as { [id: string]: string });
  }

  // Method to get fullName by id
  getAccountNameById(id: string): string {
    return this.accountsDictionary[id] || 'Unknown Account';
  }
}
