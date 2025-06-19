import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, Theme } from "@mui/material/styles";
import { PRIMARY_ORANGE } from "./colors";

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": PRIMARY_ORANGE,
            "--TextField-brandBorderFocusedColor": PRIMARY_ORANGE,
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: PRIMARY_ORANGE,
            "&.Mui-checked": {
              color: PRIMARY_ORANGE,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: PRIMARY_ORANGE,
            "&.Mui-checked": {
              color: PRIMARY_ORANGE,
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "rgba(109, 172, 171, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(230, 245, 245, 1)",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            borderColor: PRIMARY_ORANGE,
            "& .MuiButtonGroup-grouped:first-of-type": {
              borderColor: PRIMARY_ORANGE,
            },
          },
        },
      },
    },
  });

export default customTheme;
