export interface IAccount {
  id?: string;
  address: string;
  balance?: number;
  lockedBalance?: number;
  pendingBalance?: number;
  createdAt?: string;
}
