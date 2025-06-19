import { Service } from "typedi";
import { AbstractCrudService } from "./AbstractCrudService";
import { ITransaction } from "src/interfaces/ITransaction";

@Service()
export class TransactionService extends AbstractCrudService<ITransaction> {
  constructor() {
    super("transactions");
  }
}
