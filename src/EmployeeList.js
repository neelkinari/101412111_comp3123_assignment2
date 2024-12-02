import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
 import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient'; // Import the configured Axios instance



export const EmployeeList = () => {

    const [employeelist, setEmployeeList] = useState([]) // to store the employee state
    const [error, setError] = useState(null);  // State for error handling (optional)
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const navigate = useNavigate();

    const positions = ['HR', 'Manager', 'Employee', 'Intern']; // Predefined options


    // useEffect hook to fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token'); // assuming 'token' is already stored in localStorage

                // if (!token) {
                //     console.log("No token found. Please log in.");
                //     return;
                // }

                // Axios is used to make HTTP request, it returns promises
                const response = await apiClient.get('/api/v1/emp/employees', { // making a GET request to backend API endpoint to retrieve all the employees data
                    headers: { Authorization: `Bearer ${token}`}, // Authenticating the user with the backend server, (Include the token in the header)
                });

                console.log('API Response:', response.data); // Debug the response
                console.log(response.status);

                setEmployeeList(response.data); // Update the state component 

            } catch(error){
                console.log("Error occured while fetching employees: ", error)
                setError(error.message); // set the error in state
            }
        }

        // Fetch employee data when component mounts
        fetchEmployees();

    }, []); // It runs only once because there is no dependencies specified, (The empty dependency array ensures this runs once after initial render)


    // Handle a Delete action
    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem('token') // Get the token from the localStorage and store in a variable
            const response = await apiClient.delete(`/api/v1/emp/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}`},
            });

            console.log('Delete response:', response.data); // Debugging

            setEmployeeList(employeelist.filter((employee) => employee._id !== id )); // Remove the deleted employee from the list
            alert('Employee deleted successfully!');


        }catch(err){
            console.error('Error deleting employee:', err);
            alert('Failed to delete the employee.');
        }
    };

      // Handle search form submission
    const handleSearch = async (e) => {
    
        e.preventDefault();

        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await apiClient.get(`/api/v1/emp/employee/search?${query}`);
            setEmployeeList(response.data);

        } catch (err) {
                
            console.error('Error searching employees:', err);
            setError('Failed to search employees.');
        }
    };

    const handleRefresh = async () => {
        try {
          // Clear search fields
          setSearchParams({ department: '', position: '' });
      
          // Fetch all employees
          const response = await apiClient.get('/api/v1/emp/employees');
          setEmployeeList(response.data); // Update the table with all employees
        } catch (error) {
          console.error('Error refreshing employee list:', error);
          alert('Failed to refresh employee list.');
        }
      };

      
    // Handle input changes in the search form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddButton = () => {
        navigate('/employees/AddEmployee');
    }

    // Handle a View Action
    const handleView = (id) => {
        // <Route path="/employees/:id" element={<ViewById />} />
        navigate(`/employees/${id}`); // Navigate to View by Id Page
    }
    
    const HandleUpdate = (id) => {
        navigate(`/employees/${id}/UpdateEmployee`)
    }

  return (
    <div>
        <div>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddButton}>
            Add Employee
            </Button>
        
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
            <div>
            <label>Department:</label>
            <input
                type="text"
                name="department"
                value={searchParams.department}
                onChange={handleInputChange}
            />
        </div>
        <div>

            <label>Position: </label>
            <select 
                name="position" 
                value={searchParams.position} onChange={handleInputChange}>
                {positions.map((pos) => (
                    <option key={pos} value={pos}>
                    {pos}
                    </option>
                ))}
            </select>


            {/* <label>Position:</label>
            <input
                type="text"
                name="position"
                value={searchParams.position}
                onChange={handleInputChange}
            /> */}
        </div>

            <button type="submit">Search</button>
            <button 
                type="button" 
                onClick={handleRefresh} 
                style={{ marginLeft: '10px' }}
            >
                Reset
            </button>

        </form>

        {error && <p className="text-danger">Error: {error}</p>}

        
        <h1>Employee DashBoard</h1>

        <table>

            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {employeelist.map((employee) => (
                    <tr key={employee._id}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleView(employee._id)}
                            >
                            View
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => HandleUpdate(employee._id)}
                            style={{ marginLeft: '8px' }}
                            >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(employee._id)}
                            style={{ marginLeft: '8px' }}
                            >
                            Delete
                        </Button>

                        </td>
                    </tr>
                ))}
            </tbody>


        </table>

    </div>
  )
}
