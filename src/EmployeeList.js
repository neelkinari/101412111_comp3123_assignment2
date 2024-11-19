import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import apiClient from './apiClient'; // Import the configured Axios instance


export const EmployeeList = () => {

    const [employeelist, setEmployeeList] = useState([]) // to store the employee state
    const [error, setError] = useState(null);  // State for error handling (optional)


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

                console.log('Making API call...');
                // Axios is used to make HTTP request, it returns promises
                const response = await apiClient.get('/api/v1/emp/employees', { // making a GET request to backend API endpoint to retrieve all the employees data
                    headers: { Authorization: `Bearer ${token}`}, // Authenticating the user with the backend server, (Include the token in the header)
                });

                console.log('API Response:', response.data); // Debug the response

                setEmployeeList(response.data); // Update the state component 
                console.log(response.status);

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
            await axios.delete('api/v1/emp/employees/:eid', {
                headers: { Authorization: `Bearer ${token}`},
            });

            setEmployeeList(employeelist.filter((employee) => employee.empid !== id )); // Remove the deleted employee from the list
            alert('Employee deleted successfully!');


        }catch(err){
            console.error('Error deleting employee:', err);
            alert('Failed to delete the employee.');
        }
    };

    // Handle a View Action
  return (
    <div>
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
                    <tr key={employee.empid}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={() => handleView(employee.empid)}
                            >
                            View
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            // onClick={() => handleUpdate(employee.empid)}
                            style={{ marginLeft: '8px' }}
                            >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(employee.empid)}
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
