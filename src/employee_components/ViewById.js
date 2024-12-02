import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';

export const ViewById = () => {

    const { id } = useParams(); // Get the ID from the URL
    const [viewemp, setviewEmp] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeId = async () => {
            try{
                console.log(`Fetching details for employee ID: ${id}`); // Debug log for ID
                const response = await apiClient.get(`/api/v1/emp/employees/${id}`); // Kinda of attach the Url to the path, resulting in view emp by id
                console.log('API Response:', response.data); // Debug log for API response
                console.log(response.status)

                setviewEmp(response.data); // set the state to the response data
                setLoading(false); // Turn off the loading state

            }catch(err){
                setError(err.message);

            }
        } 

        fetchEmployeeId();

    }, [id])

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    if (loading) {
        return <p>Loading employee details...</p>;
      }
    if(!viewemp){
        <p>Loading...</p>;
    }

  return (
    <div>
        <h1>Employee Details</h1>
        <p><strong>First Name: </strong>{viewemp.first_name}</p>
        <p><strong>Last Name:</strong> {viewemp.last_name}</p>
        <p><strong>Email:</strong> {viewemp.email}</p>
        <p><strong>Department:</strong> {viewemp.department}</p>
        <p><strong>Position:</strong> {viewemp.position}</p>
        <p><strong>Salary:</strong> {viewemp.salary}</p>
        <p><strong>Date of Joining:</strong> {new Date(viewemp.date_of_joining).toLocaleDateString()}</p>
    </div>
  )
}
