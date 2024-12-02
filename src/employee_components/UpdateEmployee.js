import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const UpdateEmployee = () => {
    // Fetch the id from the URL
    const {id} = useParams(); // Get the employee Id from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [updateEmployee, setUpdateEmployee] = useState(null)
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null);

    // Fetch the employee details on component mount   
    useEffect(() => {

        const fetchEmployee = async () => {

            try {

                const response = await apiClient.get(`/api/v1/emp/employees/${id}`);

                setUpdateEmployee(response.data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching employee:', error);
                setError(error.response?.data?.message || 'Failed to load employee details.');
                setLoading(false); // Turn off loading on error
            }

        }

        fetchEmployee();


    }, [id]); // Everytime when the id changes or configure it will run again

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await apiClient.put(`/api/v1/emp/employees/${id}`, updateEmployee,{
                headers: { Authorization: `Bearer ${token}` },
            })
            alert('Employee updated successfully!');
            navigate("/employeelist") //After updating redirect to the employee list

        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee. Please try again.');
            
        }
    }


    // Hnadle the Input
    const handleChange = (e) => {
        // Get Destruct the name and value from e.target
        const { name, value } = e.target; // so, it will get the name and value(Inputed by user)

        // this function basically means 
        // SETUPDATEEMPLOYEE function updates the state if update employee object
        // Prev: refer to the previos state, ie the state before the change
        // the spread operator ..prev copies the state from previous state into the new object, which is name: value
        // name: value dynamically updates and the value is automatically assigned to it
        setUpdateEmployee((prev) => ({ ...prev, [name]: value }));

      };


      if (loading) {
        return <p>Loading employee details...</p>;
    }
      if (error) return <p className="text-danger">{error}</p>;

      if (!updateEmployee) return <p>No employee data available.</p>; // Ensure employee is not null
  return (
    <div>

      <h2>Update Employee</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={updateEmployee.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={updateEmployee.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updateEmployee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={updateEmployee.position}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={updateEmployee.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={updateEmployee.department}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Employee</button>
        <button type="button" onClick={() => navigate('/employeelist')} style={{ marginLeft: '10px' }}>
          Cancel
        </button>

      </form>

    </div>
  )
}
