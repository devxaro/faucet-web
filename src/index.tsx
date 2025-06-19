import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "reflect-metadata";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ProgressLoader from "@components/common/ProgressLoader";
import { AppStore, persistor } from "@store/store";
import { throwErrorIfEnvVarsNotFound } from "@utils/ConfigUtils";
import App from "./App";
import "./index.css";

throwErrorIfEnvVarsNotFound();
dayjs.extend(customParseFormat);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={AppStore}>
      <PersistGate loading={<ProgressLoader />} persistor={persistor}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
