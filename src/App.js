import logo from './logo.svg';
import './App.css';
import { Login } from './user_components/Login';
import { Signup } from './user_components/Signup';
import { EmployeeList } from './EmployeeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path ="/signup" element={<Signup/>} />
        <Route path ="/employeelist" element={<EmployeeList/>} />

      </Routes>
    </Router>
  );
}

export default App;
