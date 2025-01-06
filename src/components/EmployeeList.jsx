import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import PropTypes from "prop-types"; 
import { useEmployeeContext } from "../context/EmployeeContext"; 


const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search..."
        style={{
          padding: "8px",
          marginRight: "10px",
          width: "300px",
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};

const EmployeeList = () => {
  const { employees, deleteEmployee } = useEmployeeContext(); 


  const columns = React.useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Start Date", accessor: "startDate" },
      { Header: "Department", accessor: "department" },
      { Header: "Date of Birth", accessor: "dateOfBirth" },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button onClick={() => deleteEmployee(row.index)}>Delete</button>
        ),
        disableSortBy: true, 
      },
    ],
    [deleteEmployee]
  );


  const data = React.useMemo(() => employees, [employees]);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, 
    },
    useGlobalFilter, 
    usePagination 
  );

  return (
    <div className="global-container">

      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />


      <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerGroup.id}`}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={`header-col-${column.id}`}
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`row-${row.id}`}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={`cell-${row.id}-${cell.column.id}`}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px", marginLeft: "5px", marginRight: "10px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{ padding: "5px", background: "white" }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    })
  ),
  deleteEmployee: PropTypes.func, 
  row: PropTypes.shape({ 
    index: PropTypes.number.isRequired,
  }),
};

export default EmployeeList;
