
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import CurrentEmployees from "./pages/CurrentEmployees";
import './App.css';
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<CurrentEmployees />} />
        <Route path="/create" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
