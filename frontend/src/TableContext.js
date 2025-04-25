import React, { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export function TableProvider({ children }) {
  const [table, setTable] = useState(null);
  return (
    <TableContext.Provider value={{ table, setTable }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
