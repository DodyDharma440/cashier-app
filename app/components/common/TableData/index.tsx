import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { EnhancedTableHead } from "@components/common";
import { stableSort, getComparator } from "@utils/table";
import { useTablePage } from "@hooks/index";
import { Order } from "@custom-types/table";

type Props = {
  data: any;
  renderTableRow: (props: any, index: number) => JSX.Element;
  headCells: any;
  order: Order;
  orderBy: any;
  onRequestSort: (e: React.MouseEvent<unknown>, property: any) => void;
};

const TableData: React.FC<Props> = ({
  data,
  renderTableRow,
  headCells,
  order,
  orderBy,
  onRequestSort,
}) => {
  const { page, onChangePage, rowsPerPage, onChangeRowsPerPage } =
    useTablePage(10);

  return (
    <Paper>
      {data && (
        <>
          <TableContainer>
            <Table aria-label="Table User">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={onRequestSort}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(renderTableRow)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
};

export default TableData;
