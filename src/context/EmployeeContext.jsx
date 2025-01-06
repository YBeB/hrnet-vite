import  { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; 

const EmployeeContext = createContext();


export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  const deleteEmployee = (index) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((_, i) => i !== index)
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};


EmployeeProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };


export const useEmployeeContext = () => useContext(EmployeeContext);
