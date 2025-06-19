import { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { NavigationInitializer } from "@components/common/NavigationInitializer";
import Error from "@pages/Error";
import GamePlay from "@pages/GamePlay";
import Home from "@pages/Home";
import Layout from "@pages/Layout";
import Transactions from "@pages/Transactions";
import customTheme from "./assets/theme";

const App = (): JSX.Element => {
  const outerTheme: any = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <NavigationInitializer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<GamePlay />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        <Route path="error" element={<Error />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
