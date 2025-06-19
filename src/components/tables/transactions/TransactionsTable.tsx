import { useEffect, useState } from "react";
import { IQueryParams } from "@interfaces/IQueryParams";
import Box from "@mui/material/Box";
import {
  getIsLoading,
  getTransactions,
  getTransactionsCount,
} from "@store/app/AppSelectors";
import { useSelector } from "@store/store";
import CustomTable from "../../common/CustomTable";
import ProgressLoader from "../../common/ProgressLoader";
import CenteredContentContainer from "../../styled/CenteredContentContainer";
import transactionsColumns from "./TransactionsColumns";

interface ITransactionsTableProps {
  setPagination: (params: IQueryParams) => void;
}
const TransactionsTable = (props: ITransactionsTableProps): JSX.Element => {
  const { setPagination } = props;
  const transactionsCount = useSelector(getTransactionsCount);
  const isLoading = useSelector(getIsLoading);
  const transactions = useSelector(getTransactions);
  const columns = transactionsColumns;

  const [dataTable, setDataTable] = useState<any>([]);

  useEffect(() => {
    if (transactions?.length) {
      setDataTable(transactions);
    } else {
      setDataTable([]);
    }
  }, [transactions]);

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
          rowCount={transactionsCount}
          isLoading={isLoading}
          onPaginationChange={setPagination}
        />
      </Box>
    </CenteredContentContainer>
  );
};

export default TransactionsTable;
