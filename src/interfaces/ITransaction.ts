import { TxStatusType } from "@objects/Enums";

export interface ITransaction {
  id: string;
  txHash: string;
  amount: number;
  status: TxStatusType;
}
