import { ReactElement } from "react";
import {
  PRIMARY_BLACK,
  PRIMARY_GREY,
  PRIMARY_ORANGE,
  PRIMARY_WHITE,
  SECONDARY_ORANGE_1,
} from "@assets/colors";
import { getIcon } from "@assets/iconsMap";
import { Button } from "@mui/material";
import { setWidthStyle } from "@utils/Utils";

interface CustomButtonProps {
  label?: string;
  onClick?: (params?: any) => void;
  disabled?: boolean;
  outlined?: boolean;
  endIcon?: boolean;
  textBold?: boolean;
  iconName?: string;
  children?: ReactElement;
  type?: "button" | "submit";
  width?: number;
  size?: "small" | "medium" | "large" | undefined;
}

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const {
    onClick,
    children,
    label,
    disabled = false,
    outlined,
    iconName,
    size,
    width,
    type,
    endIcon,
    textBold,
  } = props;
  const IconComponent = iconName ? getIcon(iconName) : undefined;
  return (
    <Button
      onClick={(event: any) => {
        if (onClick && event.clientX && event.clientY) return onClick(event);
      }}
      disabled={disabled}
      variant={outlined ? "outlined" : "contained"}
      type={type || "button"}
      size={size}
      sx={{
        borderRadius: "5px",
        color: outlined ? PRIMARY_BLACK : PRIMARY_WHITE,
        backgroundColor: outlined ? "transparent" : PRIMARY_BLACK,
        border: `1px solid${PRIMARY_BLACK}`,
        fontWeight: textBold ? "bolder" : "unset",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        transition: "all 0.2s ease-out 0s",
        "&:disabled": {
          color: PRIMARY_GREY,
        },
        "&:hover": {
          backgroundColor: PRIMARY_ORANGE,
          border: `1px solid${SECONDARY_ORANGE_1}`,
          color: PRIMARY_WHITE,
        },
        lineHeight: "unset",
        textTransform: "unset",
        ...setWidthStyle(width),
        paddingX: { xs: "5px" },
      }}
    >
      {IconComponent && !endIcon && (
        <IconComponent
          sx={{ color: outlined ? PRIMARY_BLACK : PRIMARY_WHITE }}
        />
      )}
      {label}
      {IconComponent && endIcon && (
        <IconComponent
          sx={{ color: outlined ? PRIMARY_BLACK : PRIMARY_WHITE }}
        />
      )}
      {children}
    </Button>
  );
};

export default CustomButton;
