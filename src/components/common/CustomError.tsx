import { PRIMARY_GREEN } from "@assets/colors";
import { Box, Typography } from "@mui/material";
import { ICustomError } from "src/interfaces/ICustomError";

const CustomError = (props: ICustomError) => {
  const { status, code, message } = props;

  return (
    <Box>
      {message && (
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
      )}
      <Box display="flex" flexDirection="column">
        {code && (
          <Box display="flex" alignItems="center" mt={1}>
            <Typography
              variant="body2"
              fontWeight="bold"
              fontStyle="italic"
              color={PRIMARY_GREEN}
            >
              Code:
            </Typography>
            <Typography
              variant="body2"
              component="span"
              fontStyle="italic"
              ml={1}
            >
              {code}
            </Typography>
          </Box>
        )}
        {status && (
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              fontWeight="bold"
              fontStyle="italic"
              color={PRIMARY_GREEN}
            >
              Status:
            </Typography>
            <Typography
              variant="body2"
              component="span"
              fontStyle="italic"
              ml={1}
            >
              {status}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomError;
