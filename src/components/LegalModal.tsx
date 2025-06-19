import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const LegalModal = () => {
  const { i18n } = useTranslation();

  const placeholderText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at
    nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec 
    tellus sed augue semper porta.
  `;

  if (i18n.language === "fr") {
    return (
      <Box
        sx={{
          padding: "20px",
          lineHeight: "1.8",
          borderRadius: "8px",
          textAlign: "justify", // Fixed typo "textalign" => "textAlign"
          margin: "20px auto",
          maxWidth: "800px",
        }}
      >
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          padding: "20px",
          lineHeight: "1.8",
          borderRadius: "8px",
          textAlign: "justify", // Fixed typo "textalign" => "textAlign"
          margin: "20px auto",
          maxWidth: "800px",
        }}
      >
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <br />
        <Typography>{placeholderText}</Typography>
        <Typography>{placeholderText}</Typography>
      </Box>
    );
  }
};

export default LegalModal;
