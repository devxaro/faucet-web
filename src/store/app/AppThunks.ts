import { Container } from "typedi";
import { IGameEvent } from "@interfaces/IGameEvent";
import { AccountService } from "@services/api/AccountService";
import { AppService } from "@services/api/AppService";
import { GameService } from "@services/api/GameService";
import { TransactionService } from "@services/api/TransactionService";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { IQueryParams } from "src/interfaces/IQueryParams";

const accountService: any = Container.get(AccountService);
const transactionService: any = Container.get(TransactionService);
const gameService: any = Container.get(GameService);
const appService: any = Container.get(AppService);

export const connectAccount = createAppAsyncThunk(
  "account/connectAccount",
  async (accountId: string, { rejectWithValue }) => {
    try {
      if (!accountId) return rejectWithValue("Missing account ID");

      return await accountService.connectAccount(accountId);
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const getConnectedAccount = createAppAsyncThunk(
  "account/getConnectedAccount",
  async (_, { rejectWithValue }) => {
    try {
      const account = await accountService.getConnectedAccount();
      return account;
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const claimRewards = createAppAsyncThunk(
  "account/claimRewards",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await accountService.claimRewards();
      dispatch(getConnectedAccount());
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const getTransactions = createAppAsyncThunk(
  "transaction/getTransactions",
  async (payload: IQueryParams, { rejectWithValue }) => {
    try {
      return await transactionService.find(payload);
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const getWinners = createAppAsyncThunk(
  "game/getWinners",
  async (_, { rejectWithValue }) => {
    try {
      return await gameService.getWinners();
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const processGame = createAppAsyncThunk(
  "game/processGame",
  async (payload: IGameEvent, { rejectWithValue, dispatch }) => {
    try {
      await gameService.processGame(payload);
      dispatch(getConnectedAccount());
      dispatch(getWinners());
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);

export const getAppConfig = createAppAsyncThunk(
  "app/getAppConfig",
  async (_, { rejectWithValue }) => {
    try {
      return await appService.getConfig();
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status,
      });
    }
  },
);
