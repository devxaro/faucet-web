import React, { JSX, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CustomButton from "@components/common/CustomButton";
import CustomModal from "@components/common/CustomModal";
import Game from "@components/game/Game";
import GameRetry from "@components/modals/GameRetry";
import GameReward from "@components/modals/GameReward";
import { useAuthProvider } from "@hooks/UseAuthHooks";
import { GameEventType } from "@objects/Enums";
import { changeGameStartingStatus } from "@store/app/AppReducer";
import { claimRewards, processGame } from "@store/app/AppThunks";
import { useDispatch } from "@store/store";
import { MIN_SCORE } from "@utils/Constants";
import { exitGame } from "@utils/Utils";
import { IGameEvent } from "src/interfaces/IGameEvent";

const GamePlay = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useAuthProvider();

  const [lastScore, setLastScore] = useState(0);
  const [openGameRewardModal, setOpenGameRewardModal] = useState(false);
  const [openGameRetryModal, setOpenGameRetryModal] = useState(false);

  const gameRef = useRef<{ handleGameClick: () => void }>(null);

  const handleGameEvents = (event: IGameEvent) => {
    switch (event.type) {
      case GameEventType.Start:
        setOpenGameRewardModal(false);
        setOpenGameRetryModal(false);
        break;
      case GameEventType.End: {
        const { score, highScore }: any = event;
        setLastScore(score || 0);
        if (score >= MIN_SCORE) {
          dispatch(processGame({ score, highScore } as IGameEvent));
          setOpenGameRewardModal(true);
        } else {
          setOpenGameRetryModal(true);
        }

        console.log("Result :", JSON.stringify(event));
        break;
      }

      default:
        break;
    }
  };

  const handleCloseGameRewardModal = () => {
    setOpenGameRewardModal(false);
  };

  const handleCloseGameRetryModal = () => {
    setOpenGameRetryModal(false);
  };

  const handleClaim = () => {
    dispatch(claimRewards());
    handleCloseGameRewardModal();
    dispatch(changeGameStartingStatus(false));
    navigate("/transactions");
  };

  const handleExit = () => {
    dispatch(changeGameStartingStatus(false));
    exitGame();
    handleCloseGameRewardModal();
    handleCloseGameRetryModal();
  };

  const backToHome = () => {
    handleExit();
    navigate("/");
  };

  const triggerGameClick = () => {
    if (gameRef.current) {
      gameRef.current.handleGameClick();
    }
  };

  const handleRetry = () => {
    handleCloseGameRewardModal();
    handleCloseGameRetryModal();
    triggerGameClick();
  };

  useEffect(() => {
    setTimeout(() => triggerGameClick(), 500);
  }, []);

  useEffect(() => {
    if (!logged) {
      dispatch(changeGameStartingStatus(false));
    }
  }, [logged]);

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
      <Box sx={{ alignSelf: "start", zIndex: 2000 }}>
        <CustomButton
          label={t("exitGame")}
          onClick={backToHome}
          iconName="ArrowCircleLeftIcon"
          outlined
          textBold
        />
      </Box>

      <Box sx={{ py: 5 }}>
        <Game onGameEvents={handleGameEvents} ref={gameRef} />
      </Box>

      <CustomModal
        open={openGameRewardModal}
        handleClose={handleCloseGameRewardModal}
        size="small"
      >
        <GameReward
          lastScore={lastScore}
          handleRetry={handleRetry}
          handleClaim={handleClaim}
          handleExit={backToHome}
        />
      </CustomModal>
      <CustomModal
        open={openGameRetryModal}
        handleClose={handleCloseGameRetryModal}
        size="small"
      >
        <GameRetry
          lastScore={lastScore}
          handleRetry={handleRetry}
          handleExit={backToHome}
        />
      </CustomModal>
    </Box>
  );
};

export default GamePlay;
