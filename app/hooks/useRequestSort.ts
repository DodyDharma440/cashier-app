import { useState, useCallback } from "react";
import { Order } from "@custom-types/table";

function useRequestSort<T>(defaultOrderBy: T) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const onRequestSort = useCallback(
    (e: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property) as any;
    },
    [order, orderBy]
  );

  return { order, orderBy, onRequestSort };
}

export default useRequestSort;
