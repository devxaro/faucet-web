import { useTranslation } from "react-i18next";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { CustomAvatar } from "@components/common/CustomAvatar";

const winnersColumns = () => {
  const { t } = useTranslation();

  const renderPositionAvatar = (params: GridRenderCellParams) => {
    let avatar;

    switch (params.value) {
      case 1:
        avatar = { name: "🥇", color: "#ffffff00", textSize: "2rem" };
        break;
      case 2:
        avatar = { name: "🥈", color: "#ffffff00", textSize: "2rem" };
        break;
      case 3:
        avatar = { name: "🥉", color: "#ffffff00", textSize: "2rem" };
        break;
      default:
        avatar = { name: params.value, textSize: "1.1rem", size: 22 };
    }

    const updatedParams = {
      ...params,
      value: avatar,
    };

    return <CustomAvatar {...updatedParams} />;
  };

  return [
    {
      headerName: "",
      field: "position",
      renderCell: renderPositionAvatar,
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-bold",
      sortable: false,
    },
    {
      headerName: t("address"),
      field: "address",
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-bold",
      flex: 1,
      sortable: false,
    },
    {
      headerName: t("score"),
      field: "score",
      headerClassName: "text-orange text-bold text-uppercase",
      cellClassName: "text-orange text-bold",
      sortable: false,
    },
  ];
};

export default winnersColumns;
