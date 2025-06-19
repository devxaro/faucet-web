import { useEffect, useState } from "react";
import { getGameStarted, getIsPlaying } from "@store/app/AppSelectors";
import { useSelector } from "@store/store";

export const useGameStarted = (): boolean | undefined => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>();
  const gameStarted = useSelector(getGameStarted);

  useEffect(() => {
    setIsGameStarted(!!gameStarted);
  }, [gameStarted]);
  return isGameStarted;
};

export const useIsPlaying = (): boolean | undefined => {
  const [isUserPlaying, setIsUserPlaying] = useState<boolean>();
  const gameStarted = useSelector(getGameStarted);
  const isPlaying = useSelector(getIsPlaying);

  useEffect(() => {
    setIsUserPlaying(gameStarted && isPlaying);
  }, [gameStarted, isPlaying]);
  return isUserPlaying;
};
