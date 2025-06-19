import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  getIsLoading,
  getWinners,
  getWinnersCount,
} from "@store/app/AppSelectors";
import { useSelector } from "@store/store";
import CustomTable from "../../common/CustomTable";
import ProgressLoader from "../../common/ProgressLoader";
import CenteredContentContainer from "../../styled/CenteredContentContainer";
import winnersColumns from "./WinnersColumns";

const WinnersTable = (): JSX.Element => {
  const isLoading = useSelector(getIsLoading);
  const winners = useSelector(getWinners);
  const winnersCount = useSelector(getWinnersCount);

  const columns = winnersColumns;

  const [dataTable, setDataTable] = useState<any>([]);

  useEffect(() => {
    if (winners?.length) {
      setDataTable(winners);
    } else {
      setDataTable([]);
    }
  }, [winners]);

  return (
    <CenteredContentContainer>
      {isLoading && <ProgressLoader />}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <CustomTable
          columns={columns}
          rows={dataTable}
          rowCount={winnersCount}
          isLoading={isLoading}
          hidePagination
        />
      </Box>
    </CenteredContentContainer>
  );
};

export default WinnersTable;
