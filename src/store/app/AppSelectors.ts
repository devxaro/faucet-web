/* Instruments */
import { TxStatusType } from "@objects/Enums";
import type { ReduxState } from "../store";

export const getAccount = (state: ReduxState) => state.app.account;
export const getTransactions = (state: ReduxState) => state.app.transactions;
export const getExecutedTxCount = (state: ReduxState) =>
  state.app.transactions.filter((tx) => tx.status === TxStatusType.Executed)
    .length;
export const getTransactionsCount = (state: ReduxState) =>
  state.app.transactionsCount;
export const getIsLoading = (state: ReduxState) => state.app.isLoading;
export const getGameStarted = (state: ReduxState) => state.app.gameStarted;
export const getIsPlaying = (state: ReduxState) => state.app.isPlaying;
export const getWinners = (state: ReduxState) => state.app.winners;
export const getWinnersCount = (state: ReduxState) => state.app.winnersCount;
export const getConfig = (state: ReduxState) => state.app.config;
