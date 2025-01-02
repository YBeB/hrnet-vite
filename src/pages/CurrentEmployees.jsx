import { useState, useEffect } from "react";
import EmployeeList from "../components/EmployeeList";

const CurrentEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []); 

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <div className="employee-list">
      <EmployeeList employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default CurrentEmployees;
