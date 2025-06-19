import { useTranslation } from "react-i18next";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useErrorHooks } from "@hooks/UseErrorHooks";

const Error = (): JSX.Element => {
  const { t } = useTranslation();
  const error = useErrorHooks();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
          </Box>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            {t("errorMessage")}
          </Typography>
          {error?.status && (
            <Typography variant="body1" color="textSecondary">
              <strong>Status:</strong> {error.status}
            </Typography>
          )}
          {error?.code && (
            <Typography variant="body1" color="textSecondary">
              <strong>Code:</strong> {error.code}
            </Typography>
          )}
          {error?.message && (
            <Typography variant="body2" color="textSecondary" mt={1}>
              {error.message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Error;
