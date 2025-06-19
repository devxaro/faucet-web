import { Middleware } from "@reduxjs/toolkit";
import { navigateTo } from "@utils/NavigationUtils";

export const errorMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith("/rejected")) {
    const payload = action.payload;

    if (payload) {
      if (payload.code === 74000) {
        navigateTo("/login");
      } else if (payload.code === "ERR_NETWORK" || payload.status === 500) {
        navigateTo("/error");
      } else {
        console.error(
          `[ERROR] Status: ${payload.status} | Code: ${payload.code} | Message: ${payload.message}`,
        );
      }
    }
  }

  return next(action);
};
