import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  type Action,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { errorMiddleware } from "@middlewares/ErrorMiddleware";
import { loggerMiddleware } from "@middlewares/LoggerMiddleware";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([loggerMiddleware, errorMiddleware]);
  },
});

export const persistor = persistStore(AppStore);
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof AppStore;
export type ReduxState = ReturnType<typeof AppStore.getState>;
export type ReduxDispatch = typeof AppStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
