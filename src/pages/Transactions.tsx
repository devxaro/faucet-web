import React, { JSX, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PRIMARY_BLACK } from "@assets/colors";
import { IQueryParams } from "@interfaces/IQueryParams";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { Alert, Box, Chip, Container, Typography } from "@mui/material";
import CustomButton from "@components/common/CustomButton";
import CoinIcon from "@components/icons/CoinIcon";
import TransactionsTable from "@components/tables/transactions/TransactionsTable";
import { useJobProvider } from "@hooks/UseJobHook";
import { getAccount } from "@store/app/AppSelectors";
import { getTransactions } from "@store/app/AppThunks";
import { useDispatch, useSelector } from "@store/store";
import { exitGame } from "@utils/Utils";

const Transactions = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(getAccount);
  const { nextReward } = useJobProvider();
  const queryParams: IQueryParams = {
    s: "createdAt:desc",
  };

  const fetchTxs = () => {
    dispatch(getTransactions(queryParams));
  };

  const setPagination = (params: IQueryParams) => {
    queryParams.p = params.p;
    queryParams.l = params.l;
    fetchTxs();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    exitGame();
    setTimeout(() => fetchTxs(), 3000);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        px: { xs: 1, md: 5 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ alignSelf: "start", mt: 2, ml: 1 }}>
        <CustomButton
          label={t("goHome")}
          onClick={() => navigate("/")}
          iconName="ArrowCircleLeftIcon"
          outlined
          textBold
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          my: 5,
        }}
      >
        <Typography
          sx={{
            my: 2,
            fontWeight: "bold !important",
            color: PRIMARY_BLACK,
            textAlign: "center",
            typography: { xs: "h5", md: "h4" },
          }}
        >
          {t("transactions")}
        </Typography>
        <Alert icon={<TimelapseIcon fontSize="inherit" />} severity="info">
          <Typography fontWeight="bold" variant="subtitle2">
            {t("nextReward")}{" "}
            {!!account?.lockedBalance && (
              <>
                {"of "}
                <Chip
                  icon={<CoinIcon />}
                  label={`${account?.lockedBalance}`}
                  sx={{ fontWeight: "bold", mr: 1 }}
                  size="small"
                />
              </>
            )}
            in {nextReward}
          </Typography>
        </Alert>
        <TransactionsTable setPagination={setPagination} />
      </Box>
    </Container>
  );
};

export default Transactions;
