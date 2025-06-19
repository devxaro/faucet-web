import { FC } from "react";
import { useTranslation } from "react-i18next";
import logo from "@assets/logo.jpg";
import { Box, Typography } from "@mui/material";
import CustomButton from "@components/common/CustomButton";
import { getAccount } from "@store/app/AppSelectors";
import { useSelector } from "@store/store";

interface GameRewardProps {
  lastScore: number;
  handleRetry: () => void;
  handleClaim: () => void;
  handleExit?: () => void;
}

const GameReward: FC<GameRewardProps> = ({
  lastScore,
  handleRetry,
  handleClaim,
  handleExit,
}) => {
  const { t } = useTranslation();
  const account = useSelector(getAccount);

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
      <img src={logo} alt="Coin Logo" style={{ width: 80, height: 80 }} />
      <Box mt={2}>
        <Typography
          sx={{
            fontWeight: "bold !important",
            fontSize: { xs: "1rem", md: "1.3rem" },
          }}
        >
          {t("game.reward.title")}
        </Typography>

        <Typography
          sx={{
            fontWeight: "bold !important",
            typography: { xs: "h3", md: "h2" },
          }}
        >
          {lastScore} {t("coin")}
        </Typography>

        <Typography sx={{ fontSize: "1.2rem" }}>
          {t("game.reward.subtitle2")}{" "}
          <span style={{ fontWeight: "bold" }}>
            {t("game.reward.subtitle3")}
          </span>
        </Typography>
      </Box>

      <Typography
        typography="subtitle1"
        sx={{ my: 3, fontWeight: "500 !important" }}
      >
        {t("game.reward.subtitle4")}
      </Typography>

      <CustomButton
        label={t("game.reward.claimBtn", { balance: account?.pendingBalance })}
        onClick={handleClaim}
        iconName="coinIcon"
        size="large"
        width={200}
        textBold
        endIcon
      />

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          width: "200px",
          px: 2,
        }}
      >
        <CustomButton
          label={t("game.reward.playAgain")}
          onClick={handleRetry}
          outlined
          size="small"
          textBold
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

export default GameReward;
