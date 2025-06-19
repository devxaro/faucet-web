import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { JobType } from "@objects/Enums";
import {
  getAccount,
  getConfig,
  getExecutedTxCount,
} from "@store/app/AppSelectors";
import {
  connectAccount,
  getAppConfig,
  getTransactions,
} from "@store/app/AppThunks";
import { useDispatch, useSelector } from "@store/store";

export const useJobProvider = () => {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const appConfig = useSelector(getConfig);
  const executedTxCount = useSelector(getExecutedTxCount);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
    JobType.MineBlockJob,
  ]);
  const [nextBlock, setNextBlock] = useState("");

  const fetchConfig = () => {
    dispatch(getAppConfig());
  };

  useEffect(() => {
    if (!cookies[JobType.MineBlockJob] && account) {
      fetchConfig();
      if (account && executedTxCount) {
        dispatch(connectAccount(account.address));
        dispatch(getTransactions({ p: 1, l: 10, s: "createdAt:desc" }));
      }
    }
  }, [cookies[JobType.MineBlockJob]]);

  useEffect(() => {
    if (appConfig?.jobs?.length) {
      for (const job of appConfig.jobs) {
        if (job.timeout) {
          const expirationDate = new Date(job.timeout);
          setCookie(job.name, job.timeout, { expires: expirationDate });
        }
      }
    }
  }, [appConfig]);

  useEffect(() => {
    fetchConfig();
    setInterval(() => {
      updateCookies();
    }, 5000);
  }, []);

  useEffect(() => {
    const mineBlockJobExpiration = cookies[JobType.MineBlockJob];
    const updateCountdown = () => {
      const now = Date.now();
      const timeRemaining = mineBlockJobExpiration - now;

      if (timeRemaining <= 0) {
        setNextBlock("00:00");
        return;
      }

      const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
      const seconds = Math.floor((timeRemaining / 1000) % 60);
      setNextBlock(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    };

    if (mineBlockJobExpiration) {
      updateCountdown();
      const timer = setInterval(() => {
        const newExpiration = cookies[JobType.MineBlockJob];
        if (newExpiration !== mineBlockJobExpiration) {
          clearInterval(timer);
          setNextBlock("");
          return;
        }
        updateCountdown();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cookies[JobType.MineBlockJob]]);

  return {
    nextReward: nextBlock,
  };
};
