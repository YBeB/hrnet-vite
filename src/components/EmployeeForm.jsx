import { useState } from "react";
import Select from "react-select";
import Modal from "custom-react-modal-by-you";
import "custom-react-modal-by-you/dist/Modal.css";
import dayjs from "dayjs"; 
import states from "../utils/states";

const EmployeeForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "", 
    startDate: "",
    department: null,
    street: "",
    city: "",
    state: null,
    zipCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, state: selectedOption }));
    setErrors((prev) => ({ ...prev, state: "" }));
  };

  const handleDepartmentChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, department: selectedOption }));
    setErrors((prev) => ({ ...prev, department: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.street.trim()) newErrors.street = "Street is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode.trim() || isNaN(formData.zipCode)) {
      newErrors.zipCode = "Valid Zip Code is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEmployee = () => {
    if (!validateForm()) return;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push({
      ...formData,
      dateOfBirth: dayjs(formData.dateOfBirth).format("YYYY-MM-DD"), 
      startDate: dayjs(formData.startDate).format("YYYY-MM-DD"), 
      state: formData.state ? formData.state.value : null,
      department: formData.department ? formData.department.value : null,
    });
    localStorage.setItem("employees", JSON.stringify(employees));
    setIsModalOpen(true);
  };

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
  ];

  return (
    <div className="form-container">
      <form>
        <label>First Name</label>
        <input
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label>Last Name</label>
        <input
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          value={formData.dateOfBirth}
        />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          value={formData.startDate}
        />
        {errors.startDate && <span className="error">{errors.startDate}</span>}

        <label>Street</label>
        <input
          name="street"
          onChange={handleChange}
          value={formData.street}
        />
        {errors.street && <span className="error">{errors.street}</span>}

        <label>City</label>
        <input
          name="city"
          onChange={handleChange}
          value={formData.city}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <label>State</label>
        <Select
          options={stateOptions}
          onChange={handleStateChange}
          value={formData.state}
          placeholder="Select a state"
        />
        {errors.state && <span className="error">{errors.state}</span>}

        <label>Zip Code</label>
        <input
          name="zipCode"
          onChange={handleChange}
          value={formData.zipCode}
        />
        {errors.zipCode && <span className="error">{errors.zipCode}</span>}

        <label>Department</label>
        <Select
          options={departmentOptions}
          onChange={handleDepartmentChange}
          value={formData.department}
          placeholder="Select a department"
        />
        {errors.department && <span className="error">{errors.department}</span>}

        <button type="button" onClick={saveEmployee}>
          Save
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Employee Created"
      >
        <p>The employee has been successfully added!</p>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
