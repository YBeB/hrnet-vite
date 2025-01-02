import React from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";

const EmployeeList = ({ employees = [], onDelete = () => {} }) => {
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
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => (
          // eslint-disable-next-line react/prop-types
          <button onClick={() => onDelete(row.index)}>Delete</button>
        ),
      },
    ],
    [onDelete]
  );

  const data = React.useMemo(() => employees, [employees]);

 

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data, manualPagination: true, pageSize: 10 });

  return (
    <div className="global-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerGroup.id}`}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={`header-col-${column.id}`}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`row-${row.id}`}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={`cell-${row.id}-${cell.column.id}`}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
  ).isRequired,
  onDelete: PropTypes.func.isRequired, // Validate onDelete function
};

export default EmployeeList;
