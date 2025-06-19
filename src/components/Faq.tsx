import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PRIMARY_BLACK } from "@assets/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Chip, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { handleCopyClick } from "@utils/Utils";
import CustomAccordion from "./common/CustomAccordion";
const Faq = () => {
  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onCopyClick = () => {
    handleCopyClick(import.meta.env.VITE_DEFAULT_ADDRESS);
    setTooltipOpen(true);
    setTimeout(() => setTooltipOpen(false), 2000);
  };

  const faqItems = [
    {
      title: t("faq.items.item1.title"),
      description: t("faq.items.item1.description"),
      link: (
        <Tooltip
          open={tooltipOpen}
          title={
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon fontSize="small" style={{ marginRight: 1 }} />
              {t("copied")}
            </span>
          }
          arrow
        >
          <Chip
            icon={<ContentCopyIcon />}
            label={
              <span style={{ userSelect: "text" }}>
                {import.meta.env.VITE_DEFAULT_ADDRESS}
              </span>
            }
            sx={{ fontWeight: "bold" }}
            size="small"
            clickable
            onClick={onCopyClick}
          />
        </Tooltip>
      ),
    },
    {
      title: t("faq.items.item2.title"),
      description: t("faq.items.item2.description"),
    },
    {
      title: t("faq.items.item3.title"),
      description: t("faq.items.item3.description"),
    },
  ];

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold !important",
          color: PRIMARY_BLACK,
          textAlign: "center",
          typography: { xs: "h5", md: "h4" },
        }}
        gutterBottom
      >
        {t("faq.title")}
      </Typography>
      <CustomAccordion items={faqItems} expanded />
    </Box>
  );
};

export default Faq;
