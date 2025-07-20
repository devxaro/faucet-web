import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import LegalModal from "@components/LegalModal";
import TermsOfUseModal from "@components/TermsOfUseModal";
import CustomModal from "@components/common/CustomModal";
import { useGameStarted } from "@hooks/UseGameHooks";

const Footer = () => {
  const { t } = useTranslation();
  const isPlaying = useGameStarted();
  const [openLegalModal, setOpenLegalModal] = useState(false);
  const [termsOfUsesModal, setTermsOfUseModal] = useState(false);

  const handleCloseLegalModal = () => {
    setOpenLegalModal(false);
  };
  const handleTermsOfUseModal = () => {
    setTermsOfUseModal(false);
  };

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          display: isPlaying ? "none" : "flex",
          alignItems: "center",
          position: "fixed",
          justifyContent: "center",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            gap: "1rem", // Add spacing between items
            alignItems: "center", // Ensure vertical alignment of items
          }}
        >
          <Typography
            onClick={() => setOpenLegalModal(true)}
            sx={{
              fontSize: "0.8rem",
              color: "grey",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: "black", // Optional: Change color on hover
              },
            }}
          >
            {t("legalMentions")}
          </Typography>
          -
          <Typography
            onClick={() => setTermsOfUseModal(true)}
            sx={{
              fontSize: "0.8rem",
              color: "grey",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: "black",
              },
            }}
          >
            {t("terms")}
          </Typography>
        </Box> */}
        
      </AppBar>
      <CustomModal
        open={openLegalModal}
        handleClose={handleCloseLegalModal}
        title={t("legalModal")}
        size="large"
      >
        <LegalModal />
      </CustomModal>
      <CustomModal
        open={termsOfUsesModal}
        handleClose={handleTermsOfUseModal}
        title={t("termsModal")}
        size="large"
      >
        <TermsOfUseModal />
      </CustomModal>
    </>
  );
};

export default Footer;
