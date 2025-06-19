import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import CustomButton from "@components/common/CustomButton";
import CustomInput from "@components/common/CustomInput";
import CustomTooltip from "@components/common/CustomTooltip";
import CoinIcon from "@components/icons/CoinIcon";
import { useAuthProvider } from "@hooks/UseAuthHooks";
import { useIsPlaying } from "@hooks/UseGameHooks";
import { useNotification } from "@hooks/UseNotificationHook";
import {
  changeGameStartingStatus,
  disconnectAccount,
} from "@store/app/AppReducer";
import { claimRewards } from "@store/app/AppThunks";
import { useDispatch } from "@store/store";
import { exitGame, isMobileDevice, truncateAddress } from "@utils/Utils";

interface ConnectButtonFormData {
  address: string;
}
export interface ConnectProps {
  formMode?: boolean;
}
const Connect = (props: ConnectProps) => {
  const { formMode } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess } = useNotification();
  const isPlaying = useIsPlaying();
  const { account, connect, disconnect } = useAuthProvider();
  const isMobile = isMobileDevice();

  const [inputVisible, setInputVisible] = useState(!!formMode);
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required("Address is required")
      .matches(/^[a-zA-Z0-9]{30,}$/, t("invalidAddress")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectButtonFormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleLogout = () => {
    exitGame();
    dispatch(changeGameStartingStatus(false));
    disconnect();
    dispatch(disconnectAccount());
    setAccountAnchorEl(null);
    navigate("/");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleConnectAccount = () => {
    if (account) handleLogout();
    setInputVisible(true);
    navigate("/");
  };

  const onSubmitAddress = (data: ConnectButtonFormData) => {
    connect(data.address);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleClaim = () => {
    dispatch(claimRewards());
    showSuccess({
      message: t("claimSubmitted"),
    });
    navigate("/transactions");
  };

  const navitageToTxs = () => {
    exitGame();
    navigate("/transactions");
    handleAccountMenuClose();
  };

  useEffect(() => {
    if (account) {
      setInputVisible(false);
    }
  }, [account]);

  useEffect(() => {
    if (isPlaying) {
      handleAccountMenuClose();
    }
  }, [isPlaying]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      {inputVisible && (
        <Box
          display="flex"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmitAddress)}
        >
          <CustomInput
            type="text"
            placeholder={t("enterAddress")}
            register={register("address")}
            error={errors.address}
            required
          />
          <Box sx={{ ml: 2 }}>
            <CustomButton
              type="submit"
              label={t("connect")}
              size="medium"
              textBold
            />
          </Box>
        </Box>
      )}
      {!inputVisible && !account && !formMode && (
        <CustomButton
          label={t("connect")}
          onClick={handleConnectAccount}
          size="medium"
          textBold
        />
      )}
      {!inputVisible && account && !formMode && (
        <Box display="flex" alignItems="center">
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <CustomButton
              label={truncateAddress(account.address)}
              onClick={(event) => handleAccountMenuOpen(event)}
              size={isMobile ? "small" : "medium"}
              textBold
            />
            <Button
              variant="text"
              sx={{ paddingX: { xs: "5px" } }}
              onClick={navitageToTxs}
            >
              <Chip
                icon={<CoinIcon />}
                label={`${account?.balance}`}
                sx={{ fontWeight: "bold", mr: 1 }}
                size="small"
              />
              <CustomTooltip title={t("accumulatedBalance")} placement="bottom">
                <Chip
                  icon={<EmojiEventsIcon />}
                  label={`${account?.pendingBalance || 0}`}
                  sx={{ fontWeight: "bold", mr: 1 }}
                  size="small"
                />
              </CustomTooltip>
            </Button>
            {!!account?.pendingBalance && (
              <CustomButton
                type="submit"
                label={t("claim")}
                onClick={handleClaim}
                size={isMobile ? "small" : "medium"}
                textBold
              />
            )}
          </ButtonGroup>
        </Box>
      )}

      <Menu
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        onClose={handleAccountMenuClose}
      >
        <MenuList dense>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("logout")}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Connect;
