import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip } from "@mui/material";
import CustomChip from "@components/common/CustomChip"; // Adjust the import path as necessary
import CustomTooltip from "@components/common/CustomTooltip";
import { TxStatusType } from "@objects/Enums";

const transactionsColumns = () => {
  const { t } = useTranslation();
  return [
    {
      headerName: t("date"),
      field: "createdAt",
      width: 170,
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-bold",
      renderCell: (params: any) =>
        dayjs(params.value).format("MM/DD/YYYY h:mm A"),
    },

    {
      headerName: t("amount"),
      field: "amount",
      width: 90,
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-orange text-bold",
    },
    {
      headerName: t("status"),
      field: "status",
      headerClassName: "text-orange text-bold text-uppercase",
      width: 130,
      renderCell: (params: any) => (
        <CustomChip
          label={params.value}
          textColor={
            params.value === TxStatusType.Awaiting
              ? "default"
              : params.value === TxStatusType.Executed
                ? "warning"
                : "success"
          }
          size="small"
          outlined
          textBold
          chipColor={
            params.value === TxStatusType.Awaiting
              ? "default"
              : params.value === TxStatusType.Executed
                ? "warning"
                : "success"
          }
        />
      ),
    },
    {
      headerName: t("txHash"),
      field: "txHash",
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-bold",
      flex: 1,
      renderCell: (params: any) =>
        params.value ? (
          <CustomTooltip title={params.value} placement="top">
            <Chip
              icon={<OpenInNewIcon />}
              label={params.value}
              sx={{ fontWeight: "bold", mr: 1 }}
              size="small"
              component="a"
              target="_blank"
              href={`${import.meta.env.VITE_EXPLORER_URL}/tx/${params.value}`}
              clickable
            />
          </CustomTooltip>
        ) : null,
    },
  ];
};

export default transactionsColumns;
