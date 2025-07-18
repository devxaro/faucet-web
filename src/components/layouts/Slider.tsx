import React from "react";
import { useTranslation } from "react-i18next";
import { PRIMARY_BLACK } from "@assets/colors";
import logo from "@assets/logo.jpg";
import { Box, Typography } from "@mui/material";

const Slider: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        lineHeight: "1.8",
        textAlign: "justify",
        maxWidth: "600px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          my: 2,
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: { xs: "50px", md: "70px" },
            marginRight: "10px",
          }}
        />
        <Typography
          sx={{
            fontWeight: "bold !important",
            color: PRIMARY_BLACK,
            typography: { xs: "h5", md: "h3" },
            textAlign: "center",
          }}
        >
          {t("slider.title")}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: PRIMARY_BLACK,
          mb: 1,
          textAlign: "center",
        }}
      >
        {t("slider.tagline")}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: PRIMARY_BLACK,
          textAlign: "center",
        }}
      >
        {t("slider.description")}
      </Typography>
    </Box>
  );
};

export default Slider;
