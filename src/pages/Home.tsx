import React, { JSX, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PRIMARY_BLACK } from "@assets/colors";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Box, Chip, Typography } from "@mui/material";
import Faq from "@components/Faq";
import CustomModal from "@components/common/CustomModal";
import Slider from "@components/layouts/Slider";
import ConnectAccount from "@components/modals/ConnectAccount";
import WinnersTable from "@components/tables/winners/WinnersTable";
import { useAuthProvider } from "@hooks/UseAuthHooks";
import { useNotification } from "@hooks/UseNotificationHook";
import { changeGameStartingStatus } from "@store/app/AppReducer";
import { getWinners } from "@store/app/AppThunks";
import { useDispatch } from "@store/store";
import { isMobileDevice } from "@utils/Utils";

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showWarning } = useNotification();
  const { logged } = useAuthProvider();
  const loggedRef = useRef(logged);
  const isMobile = isMobileDevice();

  const [openConnectModal, setOpenConnectModal] = useState(false);

  const inviteToLogin = () => {
    if (isMobileDevice()) {
      showWarning({
        message: t("connectToPlay"),
        options: {
          toastId: "connect-to-play",
          position: "bottom-center",
        },
      });
    } else {
      setOpenConnectModal(true);
    }
  };

  const handleCloseConnectModal = () => {
    setOpenConnectModal(false);
  };

  useEffect(() => {
    loggedRef.current = !!logged;
    if (logged) {
      setOpenConnectModal(false);
    } else {
      dispatch(changeGameStartingStatus(false));
    }
  }, [logged]);

  const triggerGameStart = () => {
    if (!loggedRef.current) {
      inviteToLogin();
    } else {
      navigate("/game");
    }
  };

  useEffect(() => {
    dispatch(getWinners());
    const handleKeyDown = (event: any) => {
      if (event.code === "Space") {
        triggerGameStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 1, md: 5 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Slider />

      <Box sx={{ py: 5 }} onClick={triggerGameStart}>
        <Box
          component="img"
          src="/assets/default_100_percent/100-disabled.png"
          alt="Logo"
          sx={{
            height: { xs: "50px", md: "70px" },
            marginRight: "10px",
          }}
        />
        <Typography
          component="div" // Specify the component to use instead of <p>
          sx={{
            mt: 5,
            mb: 1,
            fontWeight: "bold !important",
            color: PRIMARY_BLACK,
            textAlign: "center",
            typography: { xs: "subtitle1", md: "h6" },
          }}
        >
          {isMobile ? (
            <>
              {t("game.instructions.clickOn")}
              <Chip
                icon={<SportsEsportsIcon />}
                label={t("game.instructions.game")}
                sx={{ mx: 1 }}
              />
              {t("game.instructions.toStartGame")}
            </>
          ) : (
            <>
              {t("game.instructions.pressThe")}
              <Chip
                icon={<SpaceBarIcon />}
                label={t("game.instructions.spacebar")}
                sx={{ mx: 1 }}
              />
              {t("game.instructions.toStartGame")}
            </>
          )}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          py: 5,
        }}
      >
        <Typography
          sx={{
            my: 2,
            fontWeight: "bold !important",
            color: PRIMARY_BLACK,
            textAlign: "center",
            typography: { xs: "h5", md: "h4" },
          }}
        >
          {t("winners")}
        </Typography>
        <WinnersTable />
      </Box>
      <Box sx={{ py: 5, maxWidth: 600, width: "100%" }}>
        <Faq />
      </Box>

      <CustomModal
        open={openConnectModal}
        handleClose={handleCloseConnectModal}
        size="small"
      >
        <ConnectAccount />
      </CustomModal>
    </Box>
  );
};

export default Home;
