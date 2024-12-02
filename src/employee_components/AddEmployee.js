import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';


export const AddEmployee = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState('Employee'); 
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [success, setSuccess] = useState(null);
    // const [error, setError] = useState(null);

    const positions = ['HR', 'Manager', 'Employee', 'Intern']; // Predefined options

    const navigate = useNavigate(); // Hook for navigation


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        // setError(null);.

        const employeeData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            position: position,
            salary: salary,
            department: department,
          };

        try {
            // Retrieve the token from local Storage
            const token = localStorage.getItem('token');

            // Axios to make POST Request
            const response = await apiClient.post('/api/v1/emp/employees', employeeData,{
                headers: { Authorization: `Bearer ${token}`},
            })

            console.log("Employee added:", response.data);

            
            // Update the State
            // Here we are setting the state to be empty because once the emp is creating it should empty the state 
            setFirstname("");
            setLastname("");
            setEmail("");
            setPosition("");
            setSalary("");
            setDepartment("");

            setSuccess("Employee added successfully!");

            
        } catch (error) {
            console.log("Error: ", error.message)
            // setError('Failed to add employee. Please try again.');

        }
    }
  

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
      };

  return (
    <div>
        <h2>Add Employee</h2>

        {success && <p style={{ color: 'green' }}>{success}</p>}
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        
        <form onSubmit={handleSubmit}>

            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Position:</label>

                <select type="string" value={position} onChange={(e) => setPosition(e.target.value)}>
                {positions.map((pos) => (
                    <option key={pos} value={pos}>
                    {pos}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label>Salary:</label>
                <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Department:</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
            </div>


        <button type="submit">Add Employee</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            Cancel
        </button>
      </form>

    </div>
  )
}
