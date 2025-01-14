import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import CreateEmployee from "./pages/CreateEmployee";
import CurrentEmployees from "./pages/CurrentEmployees";
import './App.css';
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/hrnet-vite" element={<CurrentEmployees />} />
          <Route path="/hrnet-vite/create" element={<CreateEmployee />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
};

export default App;
