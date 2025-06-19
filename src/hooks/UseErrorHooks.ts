import { useEffect, useState } from "react";
import { useSelector } from "@store/store";
import { ICustomError } from "src/interfaces/ICustomError";

export const useErrorHooks = (): ICustomError | undefined => {
  const [error, setError] = useState<ICustomError>();
  const userError = useSelector((state) => state.app.error);

  useEffect(() => {
    setError(userError);
  }, [userError]);

  return error;
};
