import React from "react";
import { PRIMARY_BLACK, PRIMARY_GREY } from "@assets/colors";
import Chip from "@mui/material/Chip";

interface CustomChipProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  size?: "small" | "medium";
  chipColor?: "primary" | "secondary" | "default" | "warning" | "success";
  outlined?: boolean;
  textBold?: boolean;
}

const CustomChip = (props: CustomChipProps): JSX.Element => {
  const {
    label,
    backgroundColor,
    textColor,
    size,
    chipColor,
    outlined,
    textBold,
  } = props;

  return (
    <Chip
      label={label}
      variant={outlined ? "outlined" : undefined}
      size={size || "medium"}
      color={chipColor}
      sx={{
        bgcolor: backgroundColor || (chipColor ? undefined : PRIMARY_GREY),
        color: textColor || PRIMARY_BLACK,
        fontWeight: textBold ? "bold" : "auto",
      }}
    />
  );
};

export default CustomChip;
