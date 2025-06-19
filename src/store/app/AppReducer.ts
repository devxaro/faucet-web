/* Core */
import { IWinner } from "@interfaces/IWinner";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  claimRewards,
  connectAccount,
  getAppConfig,
  getConnectedAccount,
  getTransactions,
  getWinners,
  processGame,
} from "./AppThunks";
import { IAccount } from "src/interfaces/IAccount";
import { ICustomError } from "src/interfaces/ICustomError";
import { ITransaction } from "src/interfaces/ITransaction";

/* Instruments */

/* Types */
export interface AppState {
  account?: IAccount;
  transactions: ITransaction[];
  transactionsCount: number;
  winners: IWinner[];
  winnersCount: number;
  isLoading: boolean;
  gameStarted?: boolean;
  isPlaying?: boolean;
  config?: any;
  error?: ICustomError;
}

export const initialState: AppState = {
  account: undefined,
  transactions: [],
  transactionsCount: 0,
  winners: [],
  winnersCount: 0,
  gameStarted: false,
  isPlaying: undefined,
  isLoading: false,
  config: undefined,
  error: undefined,
};

export const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addTx: (state: AppState, action: PayloadAction<ITransaction>) => {
      const isTxExist = !!state.transactions.find(
        (tx) => tx.id === action.payload.id,
      );
      if (!isTxExist) {
        state.transactions = [...state.transactions, action.payload];
      }
    },
    addPendingBalance: (state: AppState, action: PayloadAction<number>) => {
      if (state.account) {
        const newPendingBalance =
          (state.account?.pendingBalance || 0) + action.payload;
        state.account = { ...state.account, pendingBalance: newPendingBalance };
      }
    },
    disconnectAccount: (state: AppState) => {
      state.account = undefined;
      state.transactions = [];
      state.transactionsCount = 0;
    },
    changeGameStartingStatus: (
      state: AppState,
      action: PayloadAction<boolean>,
    ) => {
      state.gameStarted = action.payload;
    },
    changePlayingStatus: (state: AppState, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnectedAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnectedAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.isLoading = false;
      })
      .addCase(getConnectedAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(connectAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.isLoading = false;
      })
      .addCase(connectAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.docs;
        state.transactionsCount = action.payload.count;
        state.isLoading = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getWinners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWinners.fulfilled, (state, action) => {
        state.winners = action.payload.docs;
        state.winnersCount = action.payload.count;
        state.isLoading = false;
      })
      .addCase(getWinners.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(processGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(processGame.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(processGame.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(claimRewards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(claimRewards.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(claimRewards.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getAppConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.isLoading = false;
      })
      .addCase(getAppConfig.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const { reducer: appReducer } = slice;

export const {
  addTx,
  disconnectAccount,
  addPendingBalance,
  changeGameStartingStatus,
  changePlayingStatus,
} = slice.actions;

export default appReducer;
