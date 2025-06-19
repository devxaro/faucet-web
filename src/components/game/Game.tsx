import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./Game.css";
import { useTranslation } from "react-i18next";
import { PRIMARY_BLACK } from "@assets/colors";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Box, Chip, Typography } from "@mui/material";
import { useAuthProvider } from "@hooks/UseAuthHooks";
import { useGameStarted } from "@hooks/UseGameHooks";
import { GameEventType } from "@objects/Enums";
import {
  changeGameStartingStatus,
  changePlayingStatus,
} from "@store/app/AppReducer";
import { useDispatch } from "@store/store";
import { isMobileDevice } from "@utils/Utils";
import { Resources } from "./Resources";
import { IGameEvent } from "src/interfaces/IGameEvent";

declare global {
  interface Document {
    Runner: any;
  }
}

export interface GameProps {
  instructions?: ReactNode;
  hideInstructions?: boolean;
  onGameEvents?: (event: IGameEvent) => void;
}

const Game = forwardRef((props: GameProps, ref) => {
  const { instructions, hideInstructions, onGameEvents } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = isMobileDevice();
  const { logged } = useAuthProvider();
  const isGameStarted = useGameStarted();

  const [isGameDisabled, setIsGameDisabled] = useState(false);
  const [isInstructionsHidden, setIsInstructionsHidden] = useState(false);

  const isGameDisabledRef = useRef(isGameDisabled);
  const startDiv = useRef<HTMLDivElement>(null);

  const handleGameStart = () => {
    console.log("Game is Started");
    dispatch(changeGameStartingStatus(true));
    dispatch(changePlayingStatus(true));
    if (startDiv.current) {
      startDiv.current.classList.add("game-started");
    }
    setIsInstructionsHidden(true);
    onGameEvents && onGameEvents({ type: GameEventType.Start });
  };

  const handleKeyPress = () => {
    onGameEvents && onGameEvents({ type: GameEventType.KeyPress });
  };

  const handleGameOver = (finalScore: number, highScore: number) => {
    dispatch(changePlayingStatus(false));
    onGameEvents &&
      onGameEvents({
        type: GameEventType.End,
        score: finalScore,
        highScore: highScore,
      });
  };

  const handleGameDisabled = () => {
    return isGameDisabledRef.current;
  };

  const initializeGame = () => {
    if (!document.Runner) return;

    const config = {
      onGameDisabled: handleGameDisabled,
      onGameStart: handleGameStart,
      onGameOver: handleGameOver,
      onKeyPress: handleKeyPress,
    };

    new document.Runner(".interstitial-wrapper", config);
  };

  const loadGameScript = () => {
    const existingScript = document.getElementById("game-play");

    if (!existingScript) {
      const gamePlayScript = document.createElement("script");
      gamePlayScript.id = "game-play";
      gamePlayScript.src = "./game.js";
      gamePlayScript.onload = initializeGame;

      document.body.appendChild(gamePlayScript);
    } else {
      initializeGame();
    }
  };

  const handleGameClick = () => {
    if (document.Runner?.instance_ && !document.Runner?.instance_.playing) {
      if (logged && !isGameDisabled) {
        document.Runner.instance_.loadSounds();
        document.Runner.instance_.playIntro();
        document.Runner.instance_.play();
      }
      {
        handleKeyPress();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleGameClick,
  }));

  useEffect(() => {
    if (startDiv?.current) {
      loadGameScript();
    }
  }, []);

  useEffect(() => {
    isGameDisabledRef.current = isGameDisabled;
  }, [isGameDisabled]);

  useEffect(() => {
    setIsGameDisabled(!logged);
  }, [logged]);

  useEffect(() => {
    if (!isGameStarted) {
      dispatch(changeGameStartingStatus(false));
      if (startDiv.current) {
        startDiv.current.classList.remove("game-started");
        const gameWrapper = document.getElementById("game-wrapper");
        if (gameWrapper) {
          gameWrapper.classList.remove("arcade-mode");
        }

        const runnerContainer = document.getElementById("runner-container");
        if (runnerContainer) {
          runnerContainer.style.transform = "";
        }
      }
      setIsInstructionsHidden(false);
    }
  }, [isGameStarted]);

  return (
    <Box ref={startDiv} id="game-wrapper" className="offline">
      <Box
        className="interstitial-wrapper"
        id="main-frame-error"
        onClick={handleGameClick}
      >
        <Resources />
      </Box>
      {!hideInstructions && !isInstructionsHidden && (
        <Box className="interstitial-wrapper instructions">
          {instructions || (
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
          )}
        </Box>
      )}
    </Box>
  );
});

export default Game;
