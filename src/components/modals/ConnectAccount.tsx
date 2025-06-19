import { useTranslation } from "react-i18next";
import { PRIMARY_BLACK } from "@assets/colors";
import { Box, Typography } from "@mui/material";
import Connect from "@components/Connect"; // Adjust the path if necessary

const ConnectAccount = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: "bold !important",
          color: PRIMARY_BLACK,
          textAlign: "center",
          typography: { xs: "h6", md: "h5" },
        }}
      >
        {t("connectAccount")}
      </Typography>
      <Connect formMode />
    </Box>
  );
};

export default ConnectAccount;
