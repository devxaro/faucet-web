import { FC } from "react";
import { useTranslation } from "react-i18next";
import VideogameAssetOffIcon from "@mui/icons-material/VideogameAssetOff";
import { Box, Typography } from "@mui/material";
import CustomButton from "@components/common/CustomButton";
import { MIN_SCORE } from "@utils/Constants";

interface GameRetryProps {
  lastScore: number; // Add lastScore to the props
  handleRetry: () => void;
  handleExit?: () => void;
}

const GameRetry: FC<GameRetryProps> = ({
  lastScore,
  handleRetry,
  handleExit,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <VideogameAssetOffIcon
        color="error"
        sx={{ fontSize: { xs: 50, md: 80 }, my: 1 }}
      />
      <Typography
        sx={{
          fontWeight: "bold !important",
          fontSize: { xs: "1rem", md: "1.3rem" },
          mb: 2,
        }}
      >
        {t("game.retry.title")}
      </Typography>

      <Typography
        sx={{
          fontWeight: "bold !important",
          typography: { xs: "h4", md: "h3" },
        }}
      >
        {lastScore} {t("coin")}
      </Typography>

      <Box sx={{ my: 2, fontWeight: "500 !important" }}>
        <Typography typography="subtitle1">
          {t("game.retry.subtitle1", { minScore: MIN_SCORE })}
        </Typography>
        <Typography typography="subtitle1">
          {t("game.retry.subtitle2")}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1,
          gap: 2,
          display: "flex",
          flexDirection: "column",
          width: "200px",
          px: 2,
        }}
      >
        <CustomButton
          label={t("game.retry.retryBtn")}
          onClick={handleRetry}
          iconName="ReplayIcon"
          size="large"
          width={200}
          textBold
          endIcon
        />

        <CustomButton
          label={t("game.reward.exitGame")}
          onClick={handleExit}
          outlined
          size="small"
          textBold
        />
      </Box>
    </Box>
  );
};

export default GameRetry;
