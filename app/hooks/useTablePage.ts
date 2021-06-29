import { useState, useCallback } from "react";

const useTablePage = (defaultRowsPerPage: number) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
    },
    [page]
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [page, rowsPerPage]
  );

  return { page, rowsPerPage, onChangePage, onChangeRowsPerPage };
};

export default useTablePage;
