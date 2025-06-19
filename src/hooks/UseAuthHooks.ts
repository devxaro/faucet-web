import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNotification } from "@hooks/UseNotificationHook";
import { RoleType } from "@objects/Enums";
import { disconnectAccount } from "@store/app/AppReducer";
import { getAccount } from "@store/app/AppSelectors";
import { connectAccount, getConnectedAccount } from "@store/app/AppThunks";
import { useDispatch, useSelector } from "@store/store";
import { decodeToken } from "@utils/Utils";

export const useAuthProvider = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showSuccess, showWarning } = useNotification();
  const account = useSelector(getAccount);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  const refreshToken = () => {
    if (account?.address) {
      dispatch(connectAccount(account.address));
    }
  };

  const connect = (address: string) => {
    dispatch(connectAccount(address));
  };

  const disconnect = (isTokenExpired = false) => {
    if (isTokenExpired) {
      showWarning({ message: t("auth.disconnected") });
    } else {
      showSuccess({ message: t("auth.successDisconnecting") });
    }
    dispatch(disconnectAccount());
    removeCookie("access_token");
  };

  useEffect(() => {
    const token = cookies.access_token;
    if (!token && account) {
      setTokenInfo(null);
      refreshToken();
    } else if (token && !tokenInfo) {
      setTokenInfo(decodeToken(token));
    }
  }, [cookies.access_token]);

  useEffect(() => {
    const token = cookies.access_token;
    if (token && account) {
      dispatch(getConnectedAccount());
    }
  }, []);
  return {
    account,
    logged: !!tokenInfo,
    roles: tokenInfo?.roles || [],
    isAdmin: tokenInfo?.roles?.includes(RoleType.Admin),
    connect,
    disconnect,
  };
};
